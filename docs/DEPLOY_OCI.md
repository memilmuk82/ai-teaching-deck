# OCI 정적 배포 안내

이 문서는 Ubuntu 계열 OCI Compute 인스턴스에 Vite 정적 빌드를 배포하는 예시입니다. 제공된 스크립트와 Nginx 파일은 준비 자료이며, 이 저장소에서 서버 설정·방화벽·Nginx 서비스·TLS를 자동으로 변경하지 않습니다.

운영 원칙은 다음과 같습니다.

- **GitHub 원격 저장소가 원본(source of truth)** 입니다.
- OCI의 `/srv/ai-prompt-training-deck` clone은 빌드·배포용 작업 사본입니다.
- `/var/www/ai-prompt-training-deck`은 빌드 결과만 두는 서비스 웹 루트입니다.
- 실제 서비스 웹 루트에서 HTML, JavaScript 또는 CSS 소스를 직접 수정하지 않습니다.
- 토큰, SSH 개인키, API 키와 `.env` 파일을 저장소에 커밋하지 않습니다.

아래의 `sudo`, Nginx 변경, 서비스 reload와 OCI 네트워크 변경은 서버 관리자 권한이 필요한 **수동 단계**입니다.

## 1. OCI 서버에 SSH 접속

OCI Console에서 인스턴스의 공인 IP와 사용자 이름을 확인한 뒤 로컬 터미널에서 접속합니다.

```bash
ssh -i <PATH_TO_PRIVATE_KEY> ubuntu@<OCI_PUBLIC_IP>
```

개인키 파일 내용이나 비밀번호를 명령 기록, 문서 또는 저장소에 남기지 마세요.

## 2. Git, Node.js, Nginx, rsync 준비

배포 서버에 Git, Node.js 20.19.x 또는 22.12 이상과 npm, Nginx, rsync가 필요합니다. `package.json`의 `engines`가 이후 바뀌면 그 범위를 우선합니다. 운영체제의 공식 설치 방식으로 준비한 다음 버전을 확인합니다.

```bash
git --version
node --version
npm --version
nginx -v
rsync --version
```

Ubuntu 패키지 인덱스와 기본 도구를 준비하는 예시는 다음과 같습니다. Node.js는 배포 시점의 지원되는 LTS 버전을 사용하세요. 배포판 기본 `nodejs`가 프로젝트 요구 버전보다 오래된 경우 Node.js 공식 배포 방식으로 설치해야 합니다.

```bash
sudo apt update
sudo apt install -y git nginx rsync
```

설치만으로 Nginx 설정을 활성화하거나 OCI 네트워크 규칙이 열리는 것은 아닙니다.

## 3. `/srv/ai-prompt-training-deck`에 저장소 clone

배포용 디렉터리를 일반 사용자 소유로 준비합니다.

```bash
sudo install -d -o "$USER" -g "$USER" /srv/ai-prompt-training-deck
git clone <YOUR_GITHUB_REPOSITORY_URL> /srv/ai-prompt-training-deck
cd /srv/ai-prompt-training-deck
```

private GitHub 저장소라면 서버의 deploy key 또는 조직에서 승인한 인증 방식을 사용합니다. 개인 액세스 토큰을 remote URL이나 파일에 평문으로 저장하지 마세요.

## 4. 잠금 파일 기준으로 의존성 설치

```bash
cd /srv/ai-prompt-training-deck
npm ci
```

`npm ci`는 커밋된 `package-lock.json`과 `package.json`이 일치해야 성공합니다.

## 5. 검증과 빌드

```bash
npm run validate
npm run build
```

두 명령이 모두 통과하고 `dist/index.html`이 생성되었는지 확인합니다.

```bash
test -f dist/index.html && echo "build ready"
```

## 6. deploy 스크립트 실행

스크립트는 실행 전에 저장소와 대상 경로를 출력하고, `npm ci`, 검증, 빌드를 다시 실행한 뒤 `dist/`만 웹 루트에 동기화합니다. 기본 대상은 `/var/www/ai-prompt-training-deck`입니다.

```bash
chmod +x scripts/deploy-oci.sh
USE_SUDO=1 ./scripts/deploy-oci.sh
```

`USE_SUDO=1`은 웹 루트 생성과 `rsync` 단계에만 `sudo`를 사용합니다. 웹 루트가 현재 사용자에게 쓰기 가능하다면 이를 생략합니다.

대상 경로를 바꾸려면 절대 경로를 지정합니다.

```bash
WEB_ROOT=/var/www/another-deck USE_SUDO=1 ./scripts/deploy-oci.sh
```

원격의 최신 커밋을 먼저 fast-forward로 가져오는 동작은 기본적으로 꺼져 있습니다. 배포 정책상 자동 pull이 필요한 경우에만 선택적으로 켭니다.

```bash
PULL_LATEST=1 USE_SUDO=1 ./scripts/deploy-oci.sh
```

스크립트는 위험한 상위 경로, 빈 경로, 상대 경로 및 저장소 내부를 대상 웹 루트로 거부합니다. 안전 검사가 끝난 대상에만 `rsync --delete`를 사용하므로 경로 오류를 무시하거나 검사를 제거하지 마세요.

## 7. Nginx 설정 복사

먼저 설정 파일의 `server_name example.com;`을 실제 도메인으로 바꿉니다. 도메인이 아직 없으면 서버 운영 정책에 맞는 임시 host 설정을 사용하되, `example.com`인 채로 운영하지 마세요.

```bash
sudo cp nginx/ai-prompt-training-deck.conf /etc/nginx/sites-available/ai-prompt-training-deck.conf
sudo editor /etc/nginx/sites-available/ai-prompt-training-deck.conf
sudo ln -s /etc/nginx/sites-available/ai-prompt-training-deck.conf /etc/nginx/sites-enabled/ai-prompt-training-deck.conf
```

같은 이름의 파일이나 symlink가 이미 있다면 덮어쓰기 전에 현재 설정을 확인하고 백업합니다. 기본 사이트가 충돌하는지도 점검하세요. 제공 설정은 `/var/www/ai-prompt-training-deck`을 사용하므로 `WEB_ROOT`를 바꿨다면 Nginx의 `root`도 같은 경로로 수정해야 합니다.

## 8. Nginx 설정 검사

서비스를 reload하기 전에 반드시 구문을 검사합니다.

```bash
sudo nginx -t
```

오류가 있으면 다음 단계로 넘어가지 말고 파일 경로, 중복 `server_name`, symlink와 세미콜론을 확인합니다.

## 9. Nginx 서비스 reload

`nginx -t`가 성공했을 때만 반영합니다.

```bash
sudo systemctl reload nginx
sudo systemctl status nginx --no-pager
```

서버 내부에서 응답을 먼저 확인할 수 있습니다.

```bash
curl -I http://127.0.0.1/
```

## 10. OCI Security List 또는 NSG 확인

OCI Console에서 인스턴스 VNIC에 적용된 Network Security Group(NSG) 또는 서브넷 Security List의 ingress를 확인합니다.

- HTTP를 제공한다면 TCP 80 허용 여부를 확인합니다.
- TLS를 구성했다면 TCP 443 허용 여부를 확인합니다.
- 가능한 경우 허용 source CIDR을 실제 서비스 범위로 제한합니다.
- 운영체제 방화벽을 사용하는 환경이라면 해당 정책도 별도로 확인합니다.

네트워크 규칙 변경은 서비스 노출 범위를 바꾸므로 이 문서가 자동으로 수행하지 않습니다. 조직 보안 정책과 OCI 운영 권한을 확인한 뒤 직접 적용하세요.

## 11. 도메인과 TLS는 별도 단계

도메인의 A/AAAA 레코드를 OCI 인스턴스 주소에 연결하고 DNS 전파를 확인한 뒤 TLS 인증서를 설정합니다. 저장소의 Nginx 예시에는 인증서 경로, 개인키 또는 443 server 블록이 포함되어 있지 않습니다.

조직이 승인한 인증서 발급·갱신 방식(예: 관리형 로드 밸런서 또는 ACME 클라이언트)을 사용하고 다음을 지킵니다.

- 인증서 개인키를 저장소에 복사하거나 커밋하지 않습니다.
- 자동 갱신과 갱신 후 reload를 테스트합니다.
- HTTPS가 정상인 것을 확인한 뒤 HTTP→HTTPS redirect를 구성합니다.
- TLS 변경 후에도 `sudo nginx -t`를 먼저 실행합니다.

## 12. 이후 업데이트

소스는 로컬에서 수정하고 검증한 뒤 GitHub에 push합니다. OCI에서는 배포용 clone에서 최신 커밋을 가져와 재배포합니다.

```bash
cd /srv/ai-prompt-training-deck
git pull --ff-only
USE_SUDO=1 ./scripts/deploy-oci.sh
```

또는 중복 pull을 피하려면 한 번에 다음처럼 실행합니다.

```bash
cd /srv/ai-prompt-training-deck
PULL_LATEST=1 USE_SUDO=1 ./scripts/deploy-oci.sh
```

배포 뒤에는 실제 도메인에서 첫 화면, 대표 슬라이드, 정적 자산, 새로고침, 브라우저 콘솔과 캐시 헤더를 확인하세요. 문제가 생기면 웹 루트에서 즉석 수정하지 말고 GitHub 원본에서 수정·검증·커밋한 뒤 다시 배포합니다.
