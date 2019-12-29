package com.xy.cr.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.fasterxml.jackson.databind.ser.impl.FailingSerializer;
import com.xy.cr.entity.UserVipGroup;
import com.xy.cr.mapper.UserVipGroupMapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>
 * 会员分组信息 服务实现类
 * </p>
 *
 * @author jobob
 * @since 2019-12-29
 */
@Service
public class UserVipGroupService extends ServiceImpl<UserVipGroupMapper, UserVipGroup>  {

    public List<UserVipGroup> getAll() {
        QueryWrapper<UserVipGroup> query = new QueryWrapper<>();
        UserVipGroup user = new UserVipGroup();
        user.setDel(0);
        query.setEntity(user);
        query.orderByDesc("pid");
        return baseMapper.selectList(query);
    }
}
