package com.inbuddy.server.itemlist.repository;

import com.inbuddy.server.itemlist.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemlistRepository extends JpaRepository<Item, Integer> {

}
