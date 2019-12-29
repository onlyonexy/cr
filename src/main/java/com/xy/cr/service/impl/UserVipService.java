package com.xy.cr.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.xy.cr.entity.User;
import com.xy.cr.entity.UserVip;
import com.xy.cr.mapper.UserVipMapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>
 * 会员信息 服务实现类
 * </p>
 *
 * @author jobob
 * @since 2019-12-29
 */
@Service
public class UserVipService extends ServiceImpl<UserVipMapper, UserVip>  {

    public List<UserVip> getInfoByCondition(UserVip userVip) {
        QueryWrapper<UserVip> qryWrapper = new QueryWrapper<>();
        qryWrapper.eq("wx_no",  userVip.getWxNo() );
        List<UserVip> userVips = baseMapper.selectList(qryWrapper);
        return userVips;
    }

    public IPage<UserVip> getUserByCondition(IPage<UserVip> page) {
        QueryWrapper<UserVip> wrapper = new QueryWrapper<>();
        IPage<UserVip> res =  baseMapper.selectPage(page,  wrapper);
        return res;
    }
}
