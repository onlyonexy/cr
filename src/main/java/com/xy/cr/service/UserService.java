package com.xy.cr.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.xy.cr.dao.UserMapper;
import com.xy.cr.entity.User;
import org.springframework.stereotype.Service;

@Service
public class UserService extends ServiceImpl<UserMapper, User> {


    public IPage<User> getUserByCondition(IPage page) {
        QueryWrapper<User> wrapper = new QueryWrapper<>();
        IPage<User> res =  baseMapper.selectPage(page,  wrapper);
        return res;
    }

    public User findByName(String username) {
        QueryWrapper<User> query = new QueryWrapper<>();
        User user = new User();
        user.setUserName(username);
        user.setStatus(1);
        query.setEntity(user);
        return baseMapper.selectOne(query);
    }
}
