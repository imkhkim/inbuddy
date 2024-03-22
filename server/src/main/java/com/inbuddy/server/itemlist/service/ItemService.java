package com.inbuddy.server.itemlist.service;

import com.inbuddy.server.itemlist.entity.Item;
import com.inbuddy.server.itemlist.repository.ItemlistRepository;
import com.inbuddy.server.journey.entity.Journey;
import com.inbuddy.server.journey.repository.JourneyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class ItemService {

    private final JourneyRepository journeyRepository;
    private final ItemlistRepository itemlistRepository;

    @Transactional
    public void createItem(int journeyId, String itemName){
        Journey journey =journeyRepository.findByJourneyId(journeyId);
        Item item = Item.createItem(journey,itemName);
        itemlistRepository.save(item);
    }

}
