#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"
REPO_ROOT="$(cd -- "${SCRIPT_DIR}/.." && pwd -P)"
WEB_ROOT="${WEB_ROOT:-/var/www/ai-prompt-training-deck}"
PULL_LATEST="${PULL_LATEST:-0}"
USE_SUDO="${USE_SUDO:-0}"

die() {
  printf '오류: %s\n' "$*" >&2
  exit 1
}

case "${PULL_LATEST}" in
  0|1) ;;
  *) die "PULL_LATEST는 0 또는 1이어야 합니다." ;;
esac

case "${USE_SUDO}" in
  0|1) ;;
  *) die "USE_SUDO는 0 또는 1이어야 합니다." ;;
esac

[[ "$(pwd -P)" == "${REPO_ROOT}" ]] || die "저장소 루트(${REPO_ROOT})에서 실행하세요: ./scripts/deploy-oci.sh"
[[ -f "${REPO_ROOT}/package.json" ]] || die "package.json을 찾지 못했습니다. 현재 저장소에서 실행했는지 확인하세요."
[[ -d "${REPO_ROOT}/scripts" ]] || die "scripts 디렉터리를 찾지 못했습니다."

command -v realpath >/dev/null 2>&1 || die "realpath가 설치되어 있지 않습니다."

[[ -n "${WEB_ROOT//[[:space:]]/}" ]] || die "WEB_ROOT가 비어 있습니다."
[[ "${WEB_ROOT}" == /* ]] || die "WEB_ROOT는 절대 경로여야 합니다: ${WEB_ROOT}"

RESOLVED_WEB_ROOT="$(realpath -m -- "${WEB_ROOT}")"

case "${RESOLVED_WEB_ROOT}" in
  /|/bin|/boot|/dev|/etc|/home|/lib|/lib64|/opt|/proc|/root|/run|/sbin|/srv|/sys|/tmp|/usr|/var|/var/www)
    die "안전을 위해 상위 시스템 경로에는 배포할 수 없습니다: ${RESOLVED_WEB_ROOT}"
    ;;
esac

[[ "${RESOLVED_WEB_ROOT}" != "${REPO_ROOT}" ]] || die "저장소 루트를 WEB_ROOT로 사용할 수 없습니다."
[[ "${RESOLVED_WEB_ROOT}" != "${REPO_ROOT}"/* ]] || die "저장소 내부를 WEB_ROOT로 사용할 수 없습니다."
[[ "${REPO_ROOT}" != "${RESOLVED_WEB_ROOT}"/* ]] || die "저장소의 상위 디렉터리를 WEB_ROOT로 사용할 수 없습니다."
[[ "${#RESOLVED_WEB_ROOT}" -ge 12 ]] || die "WEB_ROOT가 지나치게 짧아 안전하지 않습니다: ${RESOLVED_WEB_ROOT}"

printf '저장소: %s\n' "${REPO_ROOT}"
printf '배포 대상: %s\n' "${RESOLVED_WEB_ROOT}"
printf '최신 커밋 가져오기: %s\n' "${PULL_LATEST}"
printf '배포 단계 sudo 사용: %s\n' "${USE_SUDO}"

command -v npm >/dev/null 2>&1 || die "npm이 설치되어 있지 않습니다."
command -v rsync >/dev/null 2>&1 || die "rsync가 설치되어 있지 않습니다."

if [[ "${PULL_LATEST}" == "1" ]]; then
  command -v git >/dev/null 2>&1 || die "PULL_LATEST=1이지만 git이 설치되어 있지 않습니다."
  [[ -d "${REPO_ROOT}/.git" ]] || die "PULL_LATEST=1이지만 Git 저장소가 아닙니다."
  git pull --ff-only
fi

npm ci
npm run validate
npm run build

[[ -f "${REPO_ROOT}/dist/index.html" ]] || die "빌드 결과 dist/index.html을 찾지 못했습니다."

SUDO_CMD=()
if [[ "${USE_SUDO}" == "1" ]]; then
  command -v sudo >/dev/null 2>&1 || die "USE_SUDO=1이지만 sudo를 찾지 못했습니다."
  SUDO_CMD=(sudo)
fi

TARGET_PARENT="$(dirname -- "${RESOLVED_WEB_ROOT}")"
if [[ "${USE_SUDO}" == "0" ]] && { [[ ! -d "${RESOLVED_WEB_ROOT}" && ! -w "${TARGET_PARENT}" ]] || [[ -d "${RESOLVED_WEB_ROOT}" && ! -w "${RESOLVED_WEB_ROOT}" ]]; }; then
  die "${RESOLVED_WEB_ROOT}에 쓸 권한이 없습니다. 권한을 위임하거나 USE_SUDO=1로 다시 실행하세요. 예: USE_SUDO=1 ./scripts/deploy-oci.sh"
fi

"${SUDO_CMD[@]}" mkdir -p -- "${RESOLVED_WEB_ROOT}"

# 위의 절대 경로·시스템 경로·저장소 경로 검사가 통과한 대상에만 --delete를 사용합니다.
"${SUDO_CMD[@]}" rsync --archive --delete --human-readable \
  "${REPO_ROOT}/dist/" \
  "${RESOLVED_WEB_ROOT}/"

printf '배포 완료: %s\n' "${RESOLVED_WEB_ROOT}"
printf 'Nginx 설정 반영과 reload는 이 스크립트가 수행하지 않습니다. docs/DEPLOY_OCI.md를 따르세요.\n'
