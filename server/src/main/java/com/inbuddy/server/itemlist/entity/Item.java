package com.inbuddy.server.itemlist.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.inbuddy.server.journey.entity.Journey;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Getter
@AllArgsConstructor // 생성자 추가
@NoArgsConstructor
@Entity
@Table(name= "item_list")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id")
    private int itemId;

    @JsonManagedReference
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="journey_id",nullable = false)
    private Journey journey;

    @Column(name = "item_name", nullable = false, length = 255)
    private String itemName;

    @Column(name = "item_done", nullable = false)
    private boolean itemDone = false;

    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    @Column(name = "item_creation_date", nullable = false)
    private Date itemCreationDate;

    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    @Column(name = "item_modification_date", nullable = false)
    private Date itemModificationDate;

    @Builder
    private Item(Journey journey, String itemName){
        this.journey = journey;
        this.itemName = itemName;
        this.itemDone = false;
    }

    public static Item createItem(Journey journey, String itemName){
        return new Item(journey,itemName);
    }
}
