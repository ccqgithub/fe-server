/* =============== init =================== */

CREATE TABLE `token` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'token id',
  `user_id` int(11) NOT NULL COMMENT '用户ID',
  `type` varchar(50) NOT NULL COMMENT '类型',
  `expired` datetime(6) NOT NULL COMMENT '过期时间',
  `createdAt` datetime(6) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;