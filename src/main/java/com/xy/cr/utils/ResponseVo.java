package com.xy.cr.utils;


import com.alibaba.fastjson.JSONObject;

public class ResponseVo extends JSONObject {

    private static final long serialVersionUID = 5191077219572099291L;
    private static int failedCode = 1;
    private static int okCode = 0;

    private ResponseVo() {
        this.setMsg("");
        this.setRes(failedCode);
    }

    public static ResponseVo create() {
        return new ResponseVo();
    }

    public int getRes() {
        return (Integer) this.get("errorNo");
    }

    public void setRes(int res) {
        this.put("errorNo", res);
    }

    public void setMsg(String msg) {
        this.put("msg", msg);
    }

    public void setData(Object data) {
        this.put("data", data);
    }

    public void ok() {
        this.setRes(okCode);
    }

    public void accept(Exception e) {
        this.put("exceptionMsg", e.getMessage());
    }

    public void setErrCode(int errCode) {
        this.put("errCode", errCode);
    }

}
