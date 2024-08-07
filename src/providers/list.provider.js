
import { ListResponseDTO } from "@dtos/list.dto.js";
import { getPreviewUnviewList, getPreviewLikeList, getPreviewRecentList } from "@models/list.dao.js";

export const getUnviewList = async (userId, query) => {
    let filter, sort;
    if( query === "undefined" || query === undefined || query === null){
        filter = null;
        sort = null;
    }
    else{
        filter=query.filter;
        sort=query.sort;
    }
    return ListResponseDTO(await getPreviewUnviewList(userId , sort, filter));
}

export const getLikeList = async (userId, query) => {
    let filter, sort;
    if( query === "undefined" || query === undefined || query === null){
        filter = null;
        sort = null;
    }
    else{
        filter=query.filter;
        sort=query.sort;
    }
    return ListResponseDTO(await getPreviewLikeList(userId , sort, filter));
}

export const getRecentList = async (userId, query) => {
    let filter, sort;
    if( query === "undefined" || query === undefined || query === null){
        filter = null;
        sort = null;
    }
    else{
        filter=query.filter;
        sort=query.sort;
    }
    return ListResponseDTO(await getPreviewRecentList(userId , sort, filter));
}

