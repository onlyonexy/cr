package com.xy.cr.controller;


import com.alibaba.fastjson.JSON;
import com.xy.cr.entity.UserVipGroup;
import com.xy.cr.service.impl.UserVipGroupService;
import com.xy.cr.utils.ResponseVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import java.awt.*;
import java.util.List;

/**
 * <p>
 * 会员分组信息 前端控制器
 * </p>
 *
 * @author jobob
 * @since 2019-12-29
 */
@RestController
@RequestMapping("/user-vip-group")
public class UserVipGroupController {
    @Autowired
    private UserVipGroupService userVipGroupService;

    @GetMapping("all")
    public ResponseVo list(){
        ResponseVo responseVo = ResponseVo.create();
        List<UserVipGroup> list = userVipGroupService.getAll();
       // JSON.parseObject(list,UserVipGroup.class);
        responseVo.ok();
        responseVo.setData(list);
        return responseVo;
    };
}
