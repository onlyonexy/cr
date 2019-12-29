package com.xy.cr.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.util.Date;

@Data
@TableName("user")
public class User {

    private Integer id;
    private String userName;
    private String jobNo;
    private String password;
    private int status;
    private Date createTime;
    private Date updateTime;
    private String realName;

}
