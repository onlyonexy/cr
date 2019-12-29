package com.xy.cr.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 
 * GetYzm
 * 
 * @version 1.0
 * @since JDK1.8
 * @author yanyahui
 * @company 洛阳矩阵软件有限公司
 * @copyright (c) 2019 lymatrix Co'Ltd Inc. All rights reserved.
 * @date 2019年6月10日 上午9:16:33
 */
public class GetYzm {

    private static final Logger log = LoggerFactory.getLogger(GetYzm.class);

    /**
     * 发送短信
     * 
     * @param dhhm
     * @param dx
     * @return
     */
//    public static String doPost(String dhhm, String dx) {
//        Map<String, String> params = new HashMap<>();
//        params.put("user_key", "W1wKj3XvQqBE");
//        params.put("template_key", "2386130");
//        params.put("message", "【智慧校园】您正在使用黄河水院数字迎新系统绑定手机号码，验证码为：" + dx);
//        params.put("mobile", dhhm);
//        CloseableHttpClient client = HttpClients.createDefault();
//        String responseText = "";
//        CloseableHttpResponse response = null;
//        try {
//            HttpPost method = new HttpPost("http://ceshi.yrcti.edu.cn/sms/home/sendMessage.html");
//            if (params != null) {
//                List<NameValuePair> paramList = new ArrayList<NameValuePair>();
//                for (Map.Entry<String, String> param : params.entrySet()) {
//                    NameValuePair pair = new BasicNameValuePair(param.getKey(), param.getValue());
//                    paramList.add(pair);
//                }
//                method.setEntity(new UrlEncodedFormEntity(paramList, "UTF-8"));
//            }
//            response = client.execute(method);
//            HttpEntity entity = response.getEntity();
//            if (entity != null) {
//                responseText = EntityUtils.toString(entity, "UTF-8");
//            }
//        } catch (Exception e) {
//            log.error("短信发送失败：" + dhhm + dx, e);
//        } finally {
//            try {
//                response.close();
//            } catch (Exception e) {
//                log.error("发送短信，网络异常：" + dhhm + dx, e);
//            }
//        }
//        return responseText;
//    }

    /**
     * 获取六位随机数字
     * 
     * @param numberFlag
     * @param length
     * @return
     */
    public static String createRandom(boolean numberFlag, int length) {
        String retStr = "";
        String strTable = numberFlag ? "1234567890" : "1234567890abcdefghijkmnpqrstuvwxyz";
        int len = strTable.length();
        boolean bDone = true;
        do {
            retStr = "";
            int count = 0;
            for (int i = 0; i < length; i++) {
                double dblR = Math.random() * len;
                int intR = (int) Math.floor(dblR);
                char c = strTable.charAt(intR);
                if (('0' <= c) && (c <= '9')) {
                    count++;
                }
                retStr += strTable.charAt(intR);
            }
            if (count >= 2) {
                bDone = false;
            }
        } while (bDone);
        return retStr;
    }

    /**
     * 
     * 发送手机短信
     *
     * @param mobileNumber 手机号码
     * @param message 短信内容,需要填写完整短信内容
     * @param userKey 用户key 
     * @param templateKey 短信模板key
     * @return
     *
     */
//    public static String doPostSendMobileMessage(String mobileNumber, String message,String userKey,String templateKey) {
//        Map<String, String> params = new HashMap<>();
//        params.put("user_key", userKey);
//        params.put("template_key", templateKey);
//        JSONObject result = new JSONObject();
//        boolean msg = StringUtils.isEmpty(message);
//        boolean mobile = StringUtils.isEmpty(mobileNumber);
//        boolean uKey = StringUtils.isEmpty(userKey);
//        boolean tKey = StringUtils.isEmpty(templateKey);
//        int flag = 0;
//        if (msg){
//            flag = 1;
//            result.put("message", "发送信息内容不能为空");
//        }
//        if (mobile){
//            flag = 1;
//            result.put("mobileNumber", "电话号码不能为空");
//        }
//        if (mobileNumber.length() != 11){
//            flag = 1;
//            result.put("mobileNumberLength", "电话号码位数不对");
//        }
//        if (uKey){
//            flag = 1;
//            result.put("userKey", "userKey不能为空");
//        }
//        if (tKey){
//            flag = 1;
//            result.put("templateKey", "templateKey不能为空");
//        }
//        JSONObject re = new JSONObject();
//        if (flag == 1){
//            re.put("error", "1");
//            re.put("msg", result);
//            return re.toString();
//        }
//        //"【智慧校园】您的贷款申请已经审核通过，请继续进行其他报到手续办理。"
//        params.put("message",message );
//        params.put("mobile", mobileNumber);
//        CloseableHttpClient client = HttpClients.createDefault();
//        String responseText = "";
//        CloseableHttpResponse response = null;
//        try {
//            HttpPost method = new HttpPost("http://ceshi.yrcti.edu.cn/sms/home/sendMessage.html");
//            if (params != null) {
//                List<NameValuePair> paramList = new ArrayList<NameValuePair>();
//                for (Map.Entry<String, String> param : params.entrySet()) {
//                    NameValuePair pair = new BasicNameValuePair(param.getKey(), param.getValue());
//                    paramList.add(pair);
//                }
//                method.setEntity(new UrlEncodedFormEntity(paramList, "UTF-8"));
//            }
//            response = client.execute(method);
//            HttpEntity entity = response.getEntity();
//            if (entity != null) {
//                responseText = EntityUtils.toString(entity, "UTF-8");
//            }
//        } catch (Exception e) {
//            flag = 1;
//            result.put("errorSendMessage01", "短信发送失败.");
//            log.error("短信发送失败：" + mobileNumber + "," + message, e);
//        } finally {
//            try {
//                response.close();
//            } catch (Exception e) {
//                flag = 1;
//                result.put("errorSendMessage02", "短信发送失败，网络异常.");
//                log.error("发送短信，网络异常：" + mobileNumber + "," + message, e);
//            }
//        }
//        if (flag == 1){
//            re.put("error", "1");
//            re.put("sendMessageError", result);
//            return re.toJSONString();
//        }
//        JSONObject js = JSONObject.parseObject(responseText);
//        JSONObject j = new JSONObject();
//        Boolean b = js.getBoolean("res");
//        if (b){
//            flag = 0;
//        }else{
//            flag = 1;
//        }
//        j.put("error", flag);
//        j.put("msg", responseText);
//        return j.toJSONString();
//    }
    
    /**
     * 单招生短信通知
     * @param dhhm
     * @param dx
     * @return
     */
//    public static String dzsNotice(String dhhm) {
//        Map<String, String> params = new HashMap<>();
//        params.put("user_key", "W1wKj3XvQqBE");
//        params.put("template_key", "");
//        params.put("message", "");
//        params.put("mobile", dhhm);
//        CloseableHttpClient client = HttpClients.createDefault();
//        String responseText = "";
//        CloseableHttpResponse response = null;
//        try {
//            HttpPost method = new HttpPost("http://ceshi.yrcti.edu.cn/sms/home/sendMessages.html");
//            if (params != null) {
//                List<NameValuePair> paramList = new ArrayList<NameValuePair>();
//                for (Map.Entry<String, String> param : params.entrySet()) {
//                    NameValuePair pair = new BasicNameValuePair(param.getKey(), param.getValue());
//                    paramList.add(pair);
//                }
//                method.setEntity(new UrlEncodedFormEntity(paramList, "UTF-8"));
//            }
//            response = client.execute(method);
//            HttpEntity entity = response.getEntity();
//            if (entity != null) {
//                responseText = EntityUtils.toString(entity, "UTF-8");
//            }
//        } catch (Exception e) {
//            log.error("短信发送失败：", e);
//        } finally {
//            try {
//                response.close();
//            } catch (Exception e) {
//                log.error("发送短信，网络异常：", e);
//            }
//        }
//        return responseText;
//    }
    
//    public static void main(String[] args) {
//      //  String result = GetYzm.doPost("13007572812", "123456");
//        String result = GetYzm.createRandom(false, 8);
//        System.out.println(result);
//    }

}
