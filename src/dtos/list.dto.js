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
      "createdAt": link.created_at,
      "zip": {
        "id": link.zip.id,
        "title": link.zip.title,
        "color": link.zip.color,
      },
    }));
  
    return { "links": Linklists};
}