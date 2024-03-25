package com.inbuddy.server.itemlist.controller;

import com.inbuddy.server.global.message.Message;
import com.inbuddy.server.itemlist.dto.ItemDto;
import com.inbuddy.server.itemlist.entity.Item;
import com.inbuddy.server.itemlist.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users/{user_id}/journeys/{journey_id}/itemlist")
public class ItemlistController {
    private final ItemService itemService;

    // list create의 경우 Journey가 생성되는 경우 자동으로 되기 때문에 여기엔 별도로 짜진 않는다.

    // READ
    @GetMapping
    public ResponseEntity<Object> read(@PathVariable("journey_id") int journeyId) {
        try {
            List<Item> itemList = itemService.readItemlist(journeyId);
            if (itemList.isEmpty()) {
                // 여권은 무조건 있을 거라 아마 비어있을 수 없다.
                Message message = new Message("404", "아이템 목록이 비어 있습니다.");
                return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
            } else {
                Message message = new Message("200", "아이템 목록을 가져오기 성공", itemList);
                return new ResponseEntity<>(message, HttpStatus.OK);
            }
        } catch (Exception e) {
            Message message = new Message("500", "서버 오류로 인해 아이템 목록을 가져올 수 없습니다.");
            return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // check
    @PutMapping("/{item_id}/check")
    public ResponseEntity<Object> checkItem(@PathVariable("item_id") int itemId){
        try {
            itemService.itemCheck(itemId);
            Message message = new Message("200", "아이템 ID " + itemId + "가 성공적으로 처리되었습니다.");
            return new ResponseEntity<>(message, HttpStatus.OK);
        } catch (Exception e){
            // 예외 발생 시 실패 메시지와 함께 응답
            Message message = new Message("500", "아이템 ID " + itemId + " 처리 중 오류가 발생했습니다.");
            return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
        }
    }

    // delete
    @DeleteMapping("/{item_id}/delete")
    public ResponseEntity<Object> deleteItem(@PathVariable("item_id") int itemId){
        try {
            itemService.deleteItem(itemId);
            Message message = new Message("200", "아이템 ID " + itemId + "가 성공적으로 삭제되었습니다.");
            return new ResponseEntity<>(message, HttpStatus.OK);
        } catch (Exception e){
            // 예외 발생 시 실패 메시지와 함께 응답
            Message message = new Message("500", "아이템 ID " + itemId + " 삭제 중 오류가 발생했습니다.");
            return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
        }
    }

    // create
    @PostMapping("/create")
    public ResponseEntity<Object> addItem(@RequestBody ItemDto itemDto){
        try{
            itemService.add(itemDto.getJourneyId(), itemDto.getItemName());
            Message message = new Message("200", itemDto.getItemName()+": 아이템 생성이 성공적으로 완료되었습니다.");
            return new ResponseEntity<>(message, HttpStatus.OK);
        }catch (Exception e){
            Message message = new Message("500", itemDto.getItemName()+": 아이템 생성 중 오류가 발생하였습니다.");
            return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{item_id}/modify")
    public ResponseEntity<Object> modifyItem(@PathVariable("item_id") int itemId, @RequestBody ItemDto itemDto){
        try {
            itemService.modify(itemId, itemDto.getItemName());
            Message message = new Message("200", itemDto.getItemName()+": 아이템 생성이 성공적으로 수정되었습니다.");
            return new ResponseEntity<>(message, HttpStatus.OK);
        }catch (ChangeSetPersister.NotFoundException e){
            Message message = new Message("404", itemDto.getItemName()+"아이템 생성이 실패하였습니다.");
            return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
        }catch (Exception ignored){
            Message message = new Message("500", itemDto.getItemName()+": 아이템 수정 중 오류가 발생하였습니다.");
            return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
