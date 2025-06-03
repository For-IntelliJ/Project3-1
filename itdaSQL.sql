-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        10.11.11-MariaDB - mariadb.org binary distribution
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- itda 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `itda` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `itda`;

-- 테이블 itda.board 구조 내보내기
CREATE TABLE IF NOT EXISTS `board` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `hits` int(11) DEFAULT 0,
  `writer_id` bigint(20) NOT NULL,
  `writetime` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `writer_id` (`writer_id`),
  CONSTRAINT `board_ibfk_1` FOREIGN KEY (`writer_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 itda.board:~0 rows (대략적) 내보내기

-- 테이블 itda.category 구조 내보내기
CREATE TABLE IF NOT EXISTS `category` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 itda.category:~2 rows (대략적) 내보내기
REPLACE INTO `category` (`id`, `name`) VALUES
	(2, 'AI'),
	(1, '코딩');

-- 테이블 itda.class 구조 내보내기
CREATE TABLE IF NOT EXISTS `class` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `classname` varchar(255) NOT NULL,
  `mento_id` bigint(20) NOT NULL,
  `mento_info` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` bigint(20) NOT NULL,
  `curriculum` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `main_image` varchar(255) DEFAULT NULL,
  `detail_image` varchar(255) DEFAULT NULL,
  `onoff` enum('온라인','오프라인') DEFAULT '온라인',
  `level` enum('초급','중급','고급') DEFAULT '초급',
  `detail_content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `space_info` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `addr` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `region_id` bigint(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `mento_id` (`mento_id`),
  KEY `category_id` (`category_id`),
  KEY `region_id` (`region_id`),
  CONSTRAINT `class_ibfk_1` FOREIGN KEY (`mento_id`) REFERENCES `user` (`id`),
  CONSTRAINT `class_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `class_ibfk_3` FOREIGN KEY (`region_id`) REFERENCES `region` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 itda.class:~9 rows (대략적) 내보내기
REPLACE INTO `class` (`id`, `classname`, `mento_id`, `mento_info`, `category_id`, `curriculum`, `main_image`, `detail_image`, `onoff`, `level`, `detail_content`, `space_info`, `addr`, `region_id`, `created_at`) VALUES
	(1, '테스트테스트', 1, '테스트 입니다', 2, '테스트 커리큘럼입니다', '6abcd4d2-cf00-4cc2-a9ab-9d191a4fd44e_images.jpg', 'bf5be8f9-9f97-4d9d-a65e-a11b5d392dbf_01.40011534.1.jpg', '온라인', '초급', '테스트입니다', '서울', '테스트 지역입니다', 1, '2025-05-12 05:17:23'),
	(2, '테스트2번', 1, '테스트 소개 항목 입니다', 1, '테스트 난이도 입니다', '197fec16-4bd1-4e31-b5b7-8cf3408cfc27_images.jpg', 'b711dc91-5ae4-477c-a62f-0b6910115097_01.40011534.1.jpg', '오프라인', '중급', '테스트 2번입니다', '경기', '신구대학교', 2, '2025-05-12 05:21:14'),
	(3, 'testteset', 1, 'setsetset', 2, 'testeset', NULL, NULL, '온라인', '고급', 'testteset', '서울', 'setsetset', 1, '2025-05-19 08:00:14'),
	(4, '기본 이미지 업로드 테스트', 1, '테스트', 2, '기본 이미지 링크 업로드 테스트', NULL, NULL, '온라인', '초급', '이미지 업로드 없을 때 기본 이미지 업로드 테스트 입니다', '서울', '강동구', 1, '2025-05-26 05:42:35'),
	(5, '기본이미지등록테스트', 1, '테스트테스트', 1, '기본이미지 등록테스트', NULL, NULL, '오프라인', '초급', '기본 이미지등록테스트', '서울', '강동구', 1, '2025-05-26 05:49:18'),
	(6, '기본 이미지 업로드 테스트의 테스트', 1, '테스트', 2, '초급', 'dea2f793-2958-4f87-92c0-49d5cddc4f91_ChatGPT Image 2025년 5월 26일 오후 03_00_51.png', 'https://lh5.googleusercontent.com/proxy/1tcpSHHwVM4X5lkcebeX9xZVZuvq7whm5tb1Utabaw7DDS9CmVoHEavN9g0_VPJk2q2f7LxXpYeYWC4gvRlTdR3AgGhtQ-frxnodK2ChyBBLRVM5WMCLWsiqp5TIWqWA', '오프라인', '초급', '상세 이미지는 비어있는 상태로 클래스 생성해보기', '전라도', '다른 지역 테스트', 12, '2025-05-26 06:01:38'),
	(7, '메인 이미지 NULL 테스트', 1, '테스트', 1, '중급', 'https://lh5.googleusercontent.com/proxy/1tcpSHHwVM4X5lkcebeX9xZVZuvq7whm5tb1Utabaw7DDS9CmVoHEavN9g0_VPJk2q2f7LxXpYeYWC4gvRlTdR3AgGhtQ-frxnodK2ChyBBLRVM5WMCLWsiqp5TIWqWA', '5399d390-7b88-4e6c-b0cd-7691b9b41fea_ChatGPT Image 2025년 5월 26일 오후 03_00_51.png', '온라인', '중급', '메인 이미지 없이 클래스 생성 테스트', '울산', '다른 지역 테스트', 8, '2025-05-26 06:02:54'),
	(8, '두 이미지 NULL 테스트', 1, '테스트', 2, '고급 난이도', 'https://lh5.googleusercontent.com/proxy/1tcpSHHwVM4X5lkcebeX9xZVZuvq7whm5tb1Utabaw7DDS9CmVoHEavN9g0_VPJk2q2f7LxXpYeYWC4gvRlTdR3AgGhtQ-frxnodK2ChyBBLRVM5WMCLWsiqp5TIWqWA', 'https://lh5.googleusercontent.com/proxy/1tcpSHHwVM4X5lkcebeX9xZVZuvq7whm5tb1Utabaw7DDS9CmVoHEavN9g0_VPJk2q2f7LxXpYeYWC4gvRlTdR3AgGhtQ-frxnodK2ChyBBLRVM5WMCLWsiqp5TIWqWA', '오프라인', '고급', '두 이미지 NULL 값 테스트', '인천', '다른 지역 테스트', 5, '2025-05-26 06:03:33'),
	(9, '두 이미지 업로드 테스트', 1, '테스트', 1, '중급', '10a2aced-75dd-49ec-85e8-0b199e818588_ChatGPT Image 2025년 5월 26일 오후 03_00_51.png', '1672281a-5d5b-4ebd-9b27-bfcc958211d8_ChatGPT Image 2025년 5월 26일 오후 03_00_51.png', '온라인', '중급', '두 이미지 업로드 테스트', '대구', '다른 지역 테스트', 4, '2025-05-26 06:04:14');

-- 테이블 itda.class_like 구조 내보내기
CREATE TABLE IF NOT EXISTS `class_like` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `class_id` bigint(20) NOT NULL,
  `liked_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`class_id`),
  KEY `class_id` (`class_id`),
  CONSTRAINT `class_like_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `class_like_ibfk_2` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 itda.class_like:~0 rows (대략적) 내보내기

-- 테이블 itda.faq 구조 내보내기
CREATE TABLE IF NOT EXISTS `faq` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `question` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `answer` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `writer_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `writer_id` (`writer_id`),
  CONSTRAINT `faq_ibfk_1` FOREIGN KEY (`writer_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 itda.faq:~0 rows (대략적) 내보내기

-- 테이블 itda.region 구조 내보내기
CREATE TABLE IF NOT EXISTS `region` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 itda.region:~14 rows (대략적) 내보내기
REPLACE INTO `region` (`id`, `name`) VALUES
	(1, '서울'),
	(2, '경기'),
	(3, '부산'),
	(4, '대구'),
	(5, '인천'),
	(6, '광주'),
	(7, '대전'),
	(8, '울산'),
	(9, '세종'),
	(10, '강원'),
	(11, '충청도'),
	(12, '전라도'),
	(13, '경상도'),
	(14, '제주');

-- 테이블 itda.user 구조 내보내기
CREATE TABLE IF NOT EXISTS `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `gender` enum('M','F') DEFAULT NULL,
  `role` enum('mentor','mentee') DEFAULT 'mentee',
  `login_type` enum('local','kakao') DEFAULT 'local',
  `kakao_id` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `nickname` (`nickname`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 itda.user:~4 rows (대략적) 내보내기
REPLACE INTO `user` (`id`, `nickname`, `email`, `password`, `username`, `phone`, `gender`, `role`, `login_type`, `kakao_id`, `created_at`) VALUES
	(1, '홍길동', 'hong@example.com', '123456789', '홍길동', '010-1234-5678', 'M', 'mentor', 'local', NULL, '2025-04-28 05:30:00'),
	(2, '강감찬', 'aaa@example.com', '', '강감찬', '010-2345-6789', 'M', 'mentee', 'local', NULL, '2025-05-26 06:44:47'),
	(4, '이순신신', 'bbb@example.com', '', '이순신', '010-2222-3333', 'M', 'mentee', 'local', NULL, '2025-05-26 06:45:32'),
	(5, '유관순', 'ccc@example.com', '', '유관순', '010-3333-4444', 'F', 'mentee', 'local', NULL, '2025-05-26 06:46:28');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
