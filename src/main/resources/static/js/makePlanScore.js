/**
 * 计算得分
 * key-->编码
 * v --> 填报计划值
 */
function getPlanScore(key,v) {
	if(key == "111101") {
		if(v > 15) {
			return 0;
		}else {
			return 30 - v*2;
		}
		
	}
	if(key == "111201") {
		return v * 5;
	}
	if(key == "111301") {
		return v * 5;
	}
	if(key == "112101") {
		switch (v) {
		case 0:
			return 0;
			break;
		case 1:
			return 5;
			break;	
		default:
			return 0;
			break;
		}
		
	}
	if(key == "112201") {
		switch (v) {
		case 0:
			return 0;
			break;
		case 1:
			return 10;
			break;	
		default:
			return 0;
			break;
		}
		
	}
	if(key == "113101") {
		return v * 6;
	}
	if(key == "113102") {
		return v * 4;
	}
	if(key == "113103") {
		return v * 2;
	}
	
	if(key == "114101") {
		return v * 10;
	}
	
	if(key == "121101") {
		return v * 5;
	}
	if(key == "121201") {
		return v * 10;
	}
	if(key == "121301") {
		return v * 8;
	}
	if(key == "122101") {
		switch (v) {
		case 0:
			return 10;
			break;
		case 1:
			return 10;
			break;	
		default:
			return 0;
			break;
		}
		
	}
	if(key == "122201") {
		return v*10;
	}
	if(key == "122401") {
	    switch (v) {
	    case 0:
	        return 5;
	        break;
	    case 1:
	        return 8;
	        break;	
	    case 2:
	        return 10;
	        break;	
	    default:
	        return 0;
	    break;
	    }
	}
	
	if(key == "122301") {
		var sc = 0;
		if(v < 5) {
			sc = v * 1;
		}
		if(v >= 5) {
			sc += (v-4) * 2;
		}
		return sc;
	}
	
	if(key == "123101") {
		switch (v) {
		case 0:
			return 0;
			break;
		case 1:
			return 5;
			break;	
		default:
			return 0;
		break;
		}
		
	}
	
	if(key == "123201") {
		switch (v) {
		case 0:
			return 5;
			break;
		case 1:
			return 8;
			break;	
		case 2:
			return 10;
			break;	
		case 3:
			return 10;
			break;	
		default:
			return 0;
		break;
		}
		
	}
	
	if(key == "123301") {
		switch (v) {
		case 0:
			return 5;
			break;
		case 1:
			return 5;
			break;	
		case 2:
			return 3;
			break;	
		case 3:
			return 3;
			break;	
		default:
			return 0;
		break;
		}
		
	}
	if(key == "123401") {
		switch (v) {
		case 0:
			return 3;
			break;
		case 1:
			return 5;
			break;	
		default:
			return 0;
		break;
		}
	}
	if(key == "123402") {
		switch (v) {
		case 0:
			return 5;
			break;
		case 1:
			return 8;
			break;	
		case 2:
			return 8;
			break;	
		case 3:
			return 10;
			break;	
		default:
			return 0;
		break;
		}
	}
	if(key == "131101") {
		//承担几门课程 没对应分值 暂定10分一门
		return v * 10;
	}
	if(key == "131102") {
		//基础任务课时220课时 30分,超过10课时 加1分  少10课时减2分
		var sc = 30;
		if(v >= 220) {
			sc = sc + parseInt((v - 220)/10);
		}else {
			sc = sc - parseInt((v - 220)/10)*2;
		}
		return sc;
	}
	if(key == "131201") {
		return v * 5;
	}
	
	if(key == "131301") {
		return v * 4;
	}
	
	if(key == "131401") {
		return v * 9;
	}
	
	if(key == "132101") {
		return v * 12;
	}
	
	if(key == "132201") {
		switch (v) {
		case 0:
			return 18;
			break;
		case 1:
			return 12;
			break;	
		case 1:
			return 6;
			break;	
		default:
			return 0;
		break;
		}
	}
	
	if(key == "132301") {
		switch (v) {
		case 0:
			return 18;
			break;
		case 1:
			return 12;
			break;	
		case 1:
			return 6;
			break;	
		default:
			return 0;
		break;
		}
	}
	
	//教学指导 没有量化标准 均返回0
	if(key == "133101") {
		return 0;
	}
	if(key == "134101") {
		return 0;
	}
	if(key == "134201") {
		return 0;
	}
	if(key == "134301") {
		return 0;
	}
	if(key == "134401") {
		return 0;
	}
	
	//科研与技术服务情况
	if(key == "141101") {
		return v * 4;
	}
	
	if(key == "141102") {
		return v * 8;
	}
	
	if(key == "141201") {
		return v * 5;
	}
	
	if(key == "142101") {
		return v * 0;
	}
	
	if(key == "142201") {
		return v * 6;
	}
	
	if(key == "142301") {
		return v * 12;
	}
	
	if(key == "142401") {
		return v * 18;
	}
	
	if(key == "142501") {
		switch (v) {
		case 0:
			return 20;
			break;
		case 1:
			return 9;
			break;
		case 2:
			return 4;
			break;
		default:
		    return 0;
			break;
		}
	}
	
	//横向项目未量化 返回0
	if(key == "142601") {
		return v * 0;
	}
	
	//横向项目  经费(50万，30万，10万) 分别 （30分 20分 10分）
	if(key == "142701") {
		var sc = 0;
		if(v >= 10 && v < 30) {
			sc = 10;
		}
		if(v >= 30 && v < 50) {
			sc = 20;
		}
		if(v >= 50) {
			sc = 30;
		}
		return  sc;
	}
	
	
	if(key == "143101") {
		return v * 8;
	}
	
	if(key == "143201") {
		return v * 2;
	}
	
	if(key == "144101") {
		return v * 5;
	}
	
	if(key == "144102") {
		return v * 5;
	}
	
	if(key == "144103") {
		return v * 5;
	}
	
	
}


/**
 * 技能竞赛  级别(国家级，省级，厅级) 分别 （1-3等奖 18,15,12；15,12,9；9,6,4；）
 * @param key  编码
 * @param v1   什么级别的竞赛
 * @param v2   获奖等级
 * @returns
 */
function makeJnScore(key,v1,v2) {
	//技能竞赛  级别(国家级，省级，厅级) 分别 （1-3等奖 18,15,12；15,12,9；9,6,4；）
	if(key == "133102") {
		switch (v1) {
		case 0:
			switch (v2) {
				case 0:
					return 18;
					break;
				case 1:
					return 15;
					break;	
				case 1:
					return 12;
					break;	
				default:
					return 0;
				break;
			}
			
			break;
		case 1:
			switch (v2) {
				case 0:
					return 12;
					break;
				case 1:
					return 9;
					break;	
				case 1:
					return 6;
					break;	
				default:
					return 0;
				break;
			}
			break;	
		case 1:
			switch (v2) {
				case 0:
					return 9;
					break;
				case 1:
					return 6;
					break;	
				case 1:
					return 4;
					break;	
				default:
					return 0;
				break;
			}
			break;	
		default:
			return 0;
		break;
		}
	}
	if(key == "133202") {
		switch (v1) {
		case 0:
			switch (v2) {
			case 0:
				return 18;
				break;
			case 1:
				return 15;
				break;	
			case 1:
				return 12;
				break;	
			default:
				return 0;
			break;
			}
			
			break;
		case 1:
			switch (v2) {
			case 0:
				return 12;
				break;
			case 1:
				return 9;
				break;	
			case 1:
				return 6;
				break;	
			default:
				return 0;
			break;
			}
			break;	
		case 1:
			switch (v2) {
			case 0:
				return 9;
				break;
			case 1:
				return 6;
				break;	
			case 1:
				return 4;
				break;	
			default:
				return 0;
			break;
			}
			break;	
		default:
			return 0;
		break;
		}
	}
}


