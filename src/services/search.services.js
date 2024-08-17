import { BaseError } from "@config/error";
import { status } from "@config/response.status";

export const updateSearchLogService = async(keyword, searchLogs) => {
  try{
      if(searchLogs.length == 0){
          searchLogs.push(keyword);
      } else{
          if(searchLogs.includes(keyword)){
              searchLogs.splice(searchLogs.indexOf(keyword),1);
          }
          searchLogs.unshift(keyword);
          if(searchLogs.length > 15){
              searchLogs.length = 15;
          }
      }

      return searchLogs;
  } catch(err){
      throw new BaseError(status.INTERNAL_SERVER_ERROR)
  }
}

export const deleteLogByKeywordService = async(keyword, searchLogs) => {
  try{
      if(!keyword.trim()){
          throw new BaseError(status.INVALID_KEYWORD);
      }

      if(!(searchLogs.includes(keyword))){
          throw new BaseError(status.INTERNAL_SERVER_ERROR);
      }
      searchLogs.splice(searchLogs.indexOf(keyword),1 );

      return searchLogs;
  } catch(err){
      throw err;
  }
}

export const deleteAllSearchLogsService = async(searchLogs) => {
  try{
      searchLogs = [];
      return searchLogs;
  } catch(err){
      throw new BaseError(status.INTERNAL_SERVER_ERROR)
  }
}