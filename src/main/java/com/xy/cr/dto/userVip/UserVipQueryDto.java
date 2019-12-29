package com.xy.cr.dto.userVip;

import com.xy.cr.dto.BaseQuery;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

/**
* @author onlyxy
* @date 2019年12月29日
*/
@Data
public class UserVipQueryDto extends BaseQuery {

        private static final long serialVersionUID = 1L;

        private int id;
        private String userName;

        private Date createTime;

        private Date updateTime;

        /**
         * 微信号
         */
        private String wxNo;

        /**
         * 电话号码
         */
        private String telNumber;

        /**
         * 登记日期
         */
        private Date registTime;

        /**
         * 推荐人微信号
         */
        private String recommendWx;

        private BigDecimal longitude;

        private BigDecimal  latitude;

        private String address;

        /**
         * 0-正常，1-删除
         */
        private int del;


}