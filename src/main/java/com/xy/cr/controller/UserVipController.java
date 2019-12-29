package com.xy.cr.controller;


import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.xy.cr.dto.userVip.UserVipQueryDto;
import com.xy.cr.entity.User;
import com.xy.cr.entity.UserVip;
import com.xy.cr.service.impl.UserVipService;
import com.xy.cr.utils.ResponseVo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;
import sun.rmi.runtime.Log;

import java.util.List;

/**
 * <p>
 * 会员信息 前端控制器
 * </p>
 *
 * @author jobob
 * @since 2019-12-29
 */
@Slf4j
@RestController
@RequestMapping("uservip")
public class UserVipController {

    @Autowired
    private UserVipService userVipService;

    @PostMapping("save")
    public ResponseVo save(@RequestBody UserVip userVip){
        ResponseVo responseVo = ResponseVo.create();
        log.info("{}",userVipService);
        List<UserVip> list = userVipService.getInfoByCondition(userVip);
        if (list.size() > 0){
            responseVo.setErrCode(1);
            responseVo.setMsg("微信账号已绑定");
            return responseVo;
        }
        boolean save = userVipService.saveOrUpdate(userVip);
        responseVo.ok();
        return responseVo;
    }
    @PostMapping("list")
    public ResponseVo list(@RequestBody UserVipQueryDto userVip){
        ResponseVo responseVo = ResponseVo.create();
        IPage<UserVip> page = new Page<>(userVip.getPageNo(), userVip.getPageSize());
        IPage<UserVip> userList = userVipService.getUserByCondition(page);
        userList.getPages();
        JSONObject json = new JSONObject();
        json.put("pageNo",userList.getCurrent());
        json.put("pageSize",userList.getPages());
        json.put("total",userList.getTotal());
        json.put("data",userList.getRecords());
        log.info("{}",json);
        log.info("{}",responseVo);
        responseVo.setData(json);
        log.info("{}",responseVo);
        responseVo.ok();
        return responseVo;
    }
}
