/* =============== init =================== */

CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `openid` varchar(50) NOT NULL COMMENT '小程序openid',
  `nickname` varchar(20) NOT NULL COMMENT '昵称',
  `email` varchar(30) DEFAULT NULL COMMENT '邮箱',
  `status` enum('INIT') DEFAULT 'INIT' COMMENT '状态',
  `avatar` varchar(255) DEFAULT '' COMMENT '头像',
  `weibo` varchar(100) DEFAULT '' COMMENT '微博',
  `mp` varchar(100) DEFAULT '' COMMENT '公众号',
  `intro` text CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '个人简介',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `u_nickname` (`nickname`),
  UNIQUE KEY `u_id` (`id`),
  UNIQUE KEY `u_openid` (`openid`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;