# Project3-1
---
신구대학교 3학년 C반 프로젝트 구현 첫번째 프로젝트/멘토멘티 웹사이트 제작 <br>
프론트: Create React App(CRA) 기반으로 React와 Tailwind CSS v3을 사용해 구성<br>패키지 관리는 Yarn을 사용합니다.
백엔드: Spring Boot, 통합개발환경: IntelliJ를 사용합니다.
---

## 🚀 시작 방법 (로컬 실행)

### 1. GitHub에서 클론

```bash
git clone https://github.com/For-IntelliJ/Project3-1.git
cd Project3-1
```
2. 패키지 설치
```bash
yarn install
```
3. 개발 서버 실행
- 1. 백엔드
```bash
./gradlew build
```
추후 화면 오른쪽 Gradle 탭에서 **bootRun**하면 돼요.

- 2. 프론트
```bash
yarn start
```
브라우저에서 http://localhost:3000 접속

🎨 Tailwind CSS 관련 안내
이 프로젝트는 Tailwind CSS v3를 사용합니다.

✅ 보통은 yarn install만 해도 Tailwind가 자동 설치됩니다.<br>
❗ 혹시 Tailwind 관련 에러가 난다면, 아래 명령어를 실행해 주세요:
```bash
yarn add -D tailwindcss@3 postcss autoprefixer
```
(이미 tailwind.config.js 및 postcss.config.js는 포함되어 있으므로 따로 생성할 필요는 없습니다)
