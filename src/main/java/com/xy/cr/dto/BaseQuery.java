package com.xy.cr.dto;

import lombok.Data;

/**
* @author onlyxy
* @date 2019年12月29日
*/
@Data
public class BaseQuery {
    private int pageNo;
    private int pageSize = 5;
}