package com.xy.cr.entity;

import java.math.BigDecimal;
import java.io.Serializable;
import java.util.Date;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 * 会员信息
 * </p>
 *
 * @author jobob
 * @since 2019-12-29
 */
@Data
/*@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)*/
public class UserVip implements Serializable {

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
