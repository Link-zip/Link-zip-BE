// dtos/list.dto.js


export const ListResponseDTO = (links) => {
  // 링크가 없을 경우 빈 배열 반환
  if (!links || links.length === 0) {
      return { "links": [] };
  }

  const Linklists = links.map((link) => ({
      "id": link.id,
      "title": link.title,
      "url": link.url,
      "tag": link.tag,
      "thumbnail": link.thumb,
      "like": link.like,
      "createdAt": formatDate(link.created_at),
      "zip": {
        "id": link.zip.id,
        "title": link.zip.title,
        "color": link.zip.color,
      },
    }));
  
    return { "links": Linklists};
}


const formatDate = (date) => {
  // 날짜 값이 올바른 형식인지 확인
  const validDate = new Date(date);
  if (isNaN(validDate.getTime())) {
      // 날짜 값이 유효하지 않은 경우 에러 처리
      throw new Error('Invalid date format');
  }

  // 날짜 값이 유효한 경우 포맷팅
  return new Intl.DateTimeFormat('kr').format(validDate).replaceAll(" ", "").slice(0, -1);
}
