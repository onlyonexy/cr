package com.xy.cr.utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import org.springframework.util.StringUtils;
import com.alibaba.fastjson.JSONObject;

public class WxRes extends JSONObject {

    private static final long serialVersionUID = 5191077219572099291L;
    private static int failedCode = 1;
    private static int okCode = 0;

    private WxRes() {
        this.setMsg("");
        this.setRes(failedCode);
        this.setMsg("操作成功！");
    }

    public static WxRes create() {
        return new WxRes();
    }

    public int getRes() {
        return (Integer) this.get("res");
    }

    public void setRes(int res) {
        this.put("error", res);
    }

    public void setMsg(String msg) {
        this.put("msg", msg);
    }

    @SuppressWarnings("unchecked")
    public void setData(Object data) {
        if (StringUtils.isEmpty(data)) {
            this.put("data", "");
        } else {
            // System.out.println("" + data.getClass() + "," + (data instanceof JSON) + "," + (data
            // instanceof Map));
            if (data instanceof JSONObject) {
                JSONObject js = this.rejson((JSONObject) data);
                this.setRuesult(js);
            } else if (data instanceof Map) {
                Map<Object, Object> u = this.u((Map<Object, Object>) data);
                this.setRuesult(u);
            } else if (data instanceof List) {
                List<Object> ls = new ArrayList<>();
                List<Object> ls2 = new ArrayList<>();
                ls = (List<Object>) data;
                for (Object obj : ls) {
                    if (obj instanceof Map) {
                        ls2.add(this.u((Map<Object, Object>) obj));
                    } else if (obj instanceof JSONObject) {
                        ls2.add(this.rejson((JSONObject) obj));
                    } else {
                        ls2.add(obj);
                    }
                }
                this.setRuesult(ls2);
            } else {
                this.put("data", data);
            }
        }
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

    public void setRuesult(Object obj) {
        this.put("data", obj);
    }

    @SuppressWarnings({"unchecked", "rawtypes"})
    public JSONObject rejson(JSONObject js) {
        // Iterator iterator = js.entrySet().iterator();
        JSONObject j = new JSONObject();
        for (Entry<String, Object> entry : js.entrySet()) {
            // System.out.println(entry.getKey() + ":" + entry.getValue());
            Object value = entry.getValue();
            String key = entry.getKey();
            if (value instanceof Map) {
                value = this.u((Map) value);
            } else if (value instanceof List) {
                List<Object> ls = new ArrayList<>();
                List<Object> ls2 = new ArrayList<>();
                ls = (List<Object>) value;
                for (Object obj : ls) {
                    if (obj instanceof Map) {
                        ls2.add(this.u((Map<Object, Object>) obj));
                    } else if (obj instanceof JSONObject) {
                        ls2.add(this.rejson((JSONObject) obj));
                    } else {
                        ls2.add(obj);
                    }
                }
                value = ls2;
            }
            Object va = StringUtils.isEmpty(value) ? "" : value;
            j.put(key, va);
        }
        return j;
    }

    @SuppressWarnings("rawtypes")
    public Map<Object, Object> u(Map m) {
        if (StringUtils.isEmpty(m)) {
            return null;
        }
        Iterator iter = m.entrySet().iterator();
        Map<Object, Object> c = new HashMap<>();
        while (iter.hasNext()) {
            Entry entry = (Entry) iter.next();
            Object key = entry.getKey();
            Object val = entry.getValue();
            c.put(key, val);
            if (StringUtils.isEmpty(val)) {
                c.put(key, "");
            }
        }
        return c;
    }

}
