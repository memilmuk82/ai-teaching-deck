# OCI Docker 배포 안내

이 문서는 `ai-teaching.memilmuk82.com`을 OCI Compute 인스턴스의 Docker 컨테이너로 배포하고, 호스트 Nginx에서 도메인과 TLS를 처리하는 절차입니다.

## 배포 구조

```text
브라우저
  → Cloudflare DNS (인증서 발급 전: DNS only, 발급 후: Proxied)
  → OCI TCP 80/443
  → 호스트 Nginx (도메인, TLS 종료)
  → 127.0.0.1:8080
  → Docker 컨테이너 Nginx (Vite 정적 빌드)
```

Compose는 컨테이너 포트를 `127.0.0.1:8080`에만 바인딩합니다. 따라서 8080 포트는 인터넷에 직접 공개하지 않으며, 외부 요청은 반드시 호스트 Nginx를 거칩니다. 인증서와 개인키는 호스트에서 관리하고 이미지나 저장소에 포함하지 않습니다.

GitHub 원격 저장소가 원본(source of truth)이며, OCI의 clone은 배포용 작업 사본입니다. 실행 중인 컨테이너나 생성된 `dist/`를 직접 수정하지 마세요.

## 1. 배포 전 확인

Cloudflare의 `ai-teaching.memilmuk82.com` A 또는 AAAA 레코드가 OCI 인스턴스를 가리키고 **DNS only** 상태인지 확인합니다. 인증서 발급 전에는 프록시를 활성화하지 않습니다.

OCI Network Security Group 또는 Security List와 운영체제 방화벽에서 다음 ingress를 허용합니다.

- TCP 80: HTTP 및 ACME 인증
- TCP 443: HTTPS
- TCP 8080: 외부에 허용하지 않음

DNS와 네트워크 변경은 서비스 노출 범위를 바꾸므로 OCI와 Cloudflare 운영 권한이 있는 관리자가 직접 확인해야 합니다.

## 2. 서버 도구 준비

OCI 인스턴스에 SSH로 접속한 뒤 Git, Docker Engine, Docker Compose 플러그인, Nginx와 Certbot을 준비합니다. 설치 방식은 해당 운영체제와 조직 정책을 따릅니다.

```bash
git --version
docker --version
docker compose version
nginx -v
certbot --version
```

Docker 명령 권한을 일반 사용자에게 부여했다면 새 로그인 세션에서 적용 여부를 확인합니다. 저장소의 `.env`나 Git remote URL에 토큰, 비밀번호, API 키를 저장하지 마세요.

## 3. 저장소 준비

처음 배포하는 경우:

```bash
sudo install -d -o "$USER" -g "$USER" /srv/ai-teaching-deck
git clone <YOUR_GITHUB_REPOSITORY_URL> /srv/ai-teaching-deck
cd /srv/ai-teaching-deck
```

private 저장소에는 서버 전용 deploy key 또는 조직이 승인한 인증 방식을 사용합니다.

## 4. 이미지 빌드와 컨테이너 기동

```bash
cd /srv/ai-teaching-deck
docker compose build
docker compose up -d
docker compose ps
```

Dockerfile은 다음 두 단계로 이미지를 만듭니다.

1. `node:22-alpine`에서 `npm ci`, `npm run validate`, `npm run build` 실행
2. `nginx:1.28-alpine`에 `dist/`와 컨테이너용 Nginx 설정만 복사

빌드 중 검증이나 Vite 빌드가 실패하면 이미지가 생성되지 않습니다.

컨테이너 응답과 상태를 호스트에서 확인합니다.

```bash
curl --fail http://127.0.0.1:8080/healthz
curl --head http://127.0.0.1:8080/
docker compose logs --tail=100 deck
```

`healthz`가 `ok`를 반환하고 `docker compose ps`의 상태가 healthy인지 확인한 뒤 다음 단계로 이동합니다.

## 5. 호스트 Nginx reverse proxy 활성화

저장소의 `nginx/ai-teaching.memilmuk82.com`은 이 서브도메인만 담당하며, 요청을 `127.0.0.1:8080`으로 전달합니다. 다른 서브도메인은 같은 파일에 합치지 않고 `/etc/nginx/sites-available/` 아래에 별도 파일로 관리합니다.

```bash
sudo cp nginx/ai-teaching.memilmuk82.com \
  /etc/nginx/sites-available/ai-teaching.memilmuk82.com
sudo ln -s \
  /etc/nginx/sites-available/ai-teaching.memilmuk82.com \
  /etc/nginx/sites-enabled/ai-teaching.memilmuk82.com
sudo nginx -t
sudo systemctl reload nginx
```

같은 이름의 파일이나 symlink가 이미 있다면 덮어쓰기 전에 현재 설정을 백업하고, 중복 `server_name`과 기본 사이트 충돌을 확인합니다. `nginx -t`가 실패한 상태에서는 reload하지 않습니다.

DNS가 전파된 뒤 외부 HTTP 응답을 확인합니다.

```bash
curl --head http://ai-teaching.memilmuk82.com/
```

## 6. TLS 인증서 발급

Cloudflare 레코드가 계속 **DNS only**이고 TCP 80이 원본 서버까지 도달하는 상태에서 호스트 Nginx용 인증서를 발급합니다. Certbot Nginx 플러그인을 사용하는 예시는 다음과 같습니다.

```bash
sudo certbot --nginx \
  --redirect \
  -d ai-teaching.memilmuk82.com
```

Certbot이 Nginx 설정을 수정한 뒤 다음 항목을 확인합니다.

```bash
sudo nginx -t
curl --head https://ai-teaching.memilmuk82.com/
sudo certbot renew --dry-run
```

실제 인증서와 개인키 경로를 저장소의 Nginx 예시 파일에 기록하거나 커밋하지 않습니다.

## 7. Cloudflare 프록시 활성화

원본 HTTPS와 자동 갱신 테스트가 모두 성공한 뒤 Cloudflare에서 다음 순서로 전환합니다.

1. SSL/TLS 암호화 모드를 **Full (strict)**로 설정
2. `ai-teaching.memilmuk82.com` DNS 레코드를 **Proxied**로 변경
3. 브라우저와 `curl`로 HTTPS 응답, 정적 자산, 슬라이드 이동을 확인
4. Cloudflare 오류가 발생하면 원본 인증서, 80/443 ingress, Nginx와 컨테이너 로그 확인

Flexible 모드는 원본 구간을 HTTP로 남기고 redirect loop를 만들 수 있으므로 사용하지 않습니다. 프록시 활성화 뒤에도 호스트 인증서 자동 갱신이 계속 동작하는지 운영 중 확인하세요.

## 8. 이후 업데이트

로컬 변경을 검증하고 GitHub에 push한 뒤 OCI 배포 clone에서 다음 명령을 실행합니다.

```bash
cd /srv/ai-teaching-deck
git pull --ff-only
docker compose build --pull
docker compose up -d
docker compose ps
curl --fail http://127.0.0.1:8080/healthz
```

새 이미지가 정상 기동된 뒤 사용하지 않는 이미지를 정리할 수 있습니다. 실행 중인 이미지와 롤백에 필요한 이미지를 확인하지 않은 채 강제 삭제하지 마세요.

## 9. 문제 확인

```bash
docker compose ps
docker compose logs --tail=200 deck
curl --verbose http://127.0.0.1:8080/healthz
sudo nginx -t
sudo journalctl -u nginx --since "30 minutes ago" --no-pager
```

- `127.0.0.1:8080` 실패: 컨테이너 빌드, 상태와 로그 확인
- 로컬 8080 성공, 도메인 HTTP 실패: 호스트 Nginx, DNS, OCI ingress 확인
- HTTP 성공, HTTPS 실패: 인증서 경로, 만료일, 443 설정 확인
- 프록시 활성화 뒤 실패: Cloudflare SSL/TLS 모드가 Full (strict)인지 확인

저장소의 `scripts/deploy-oci.sh`는 Docker를 사용할 수 없는 환경에서 `dist/`를 호스트 웹 루트로 복사하는 레거시 배포 도구입니다. Docker 배포와 동시에 실행하지 않습니다.
