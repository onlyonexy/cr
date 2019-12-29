package com.xy.cr.entity;

import java.io.Serializable;
import java.util.Date;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 * 会员分组信息
 * </p>
 *
 * @author jobob
 * @since 2019-12-29
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class UserVipGroup implements Serializable {

    private static final long serialVersionUID = 1L;

    private String groupType;

    /**
     * 分组名
     */
    private String groupName;

    private Date createTime;

    private Date updateTime;

    /**
     * 注释
     */
    private String remaker;

    /**
     * 父级
     */
    private Integer pid;

    /**
     * 是否删除，0-正常，1-删除
     */
    private Integer del;


}
