package com.xy.cr.utils;

public class PageUtil {

	/** 
    * 获得总的页码数量 
    *  
    * @return 
    */  
   public static int getTotalPage(int total,int pageSize) {  
       if (total % pageSize > 0) {  
           return total / pageSize + 1;  
       } else {  
           return total / pageSize;  
       }  
   } 
}
