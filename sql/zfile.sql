/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 80023
 Source Host           : localhost:3306
 Source Schema         : zfile

 Target Server Type    : MySQL
 Target Server Version : 80023
 File Encoding         : 65001

 Date: 01/04/2022 00:59:35
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for driver_config
-- ----------------------------
DROP TABLE IF EXISTS `driver_config`;
CREATE TABLE `driver_config`  (
  `ID` int NOT NULL,
  `AUTO_REFRESH_CACHE` tinyint(1) NULL DEFAULT NULL,
  `DEFAULT_SWITCH_TO_IMG_MODE` tinyint(1) NULL DEFAULT NULL,
  `ENABLE` tinyint(1) NULL DEFAULT NULL,
  `ENABLE_CACHE` tinyint(1) NULL DEFAULT NULL,
  `NAME` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `ORDER_NUM` int NULL DEFAULT NULL,
  `SEARCH_CONTAIN_ENCRYPTED_FILE` tinyint(1) NULL DEFAULT NULL,
  `SEARCH_ENABLE` tinyint(1) NULL DEFAULT NULL,
  `SEARCH_IGNORE_CASE` tinyint(1) NULL DEFAULT NULL,
  `TYPE` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of driver_config
-- ----------------------------

-- ----------------------------
-- Table structure for filter_config
-- ----------------------------
DROP TABLE IF EXISTS `filter_config`;
CREATE TABLE `filter_config`  (
  `ID` int NOT NULL AUTO_INCREMENT,
  `DRIVE_ID` int NULL DEFAULT NULL,
  `EXPRESSION` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of filter_config
-- ----------------------------

-- ----------------------------
-- Table structure for short_link
-- ----------------------------
DROP TABLE IF EXISTS `short_link`;
CREATE TABLE `short_link`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `create_date` datetime(6) NULL DEFAULT NULL,
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 50 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of short_link
-- ----------------------------

-- ----------------------------
-- Table structure for storage_config
-- ----------------------------
DROP TABLE IF EXISTS `storage_config`;
CREATE TABLE `storage_config`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `drive_id` int NULL DEFAULT NULL,
  `k` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `value` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of storage_config
-- ----------------------------

-- ----------------------------
-- Table structure for system_config
-- ----------------------------
DROP TABLE IF EXISTS `system_config`;
CREATE TABLE `system_config`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `k` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `value` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of system_config
-- ----------------------------
INSERT INTO `system_config` VALUES (1, 'siteName', '????????????', 'zfile');
INSERT INTO `system_config` VALUES (5, 'storageStrategy', '????????????????????????', NULL);
INSERT INTO `system_config` VALUES (6, 'username', '???????????????', 'admin');
INSERT INTO `system_config` VALUES (7, 'password', '???????????????', 'e10adc3949ba59abbe56e057f20f883e');
INSERT INTO `system_config` VALUES (8, 'domain', '????????????', 'http://localhost:9101');
INSERT INTO `system_config` VALUES (11, 'customCss', '????????? CSS', 'aaa');
INSERT INTO `system_config` VALUES (12, 'customJs', '????????? JS (?????????????????????)', ' ');
INSERT INTO `system_config` VALUES (13, 'tableSize', '????????????', 'small');
INSERT INTO `system_config` VALUES (14, 'showOperator', '????????????????????????', 'true');
INSERT INTO `system_config` VALUES (15, 'showDocument', '??????????????????', 'true');
INSERT INTO `system_config` VALUES (16, 'announcement', '????????????', '????????????');
INSERT INTO `system_config` VALUES (17, 'showAnnouncement', '????????????????????????', 'true');
INSERT INTO `system_config` VALUES (18, 'layout', '????????????', 'full');
INSERT INTO `system_config` VALUES (19, 'showLinkBtn', '??????????????????????????????', 'true');
INSERT INTO `system_config` VALUES (20, 'showShortLink', '??????????????????', 'true');
INSERT INTO `system_config` VALUES (21, 'showPathLink', '????????????????????????', 'true');

SET FOREIGN_KEY_CHECKS = 1;
