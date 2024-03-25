package com.inbuddy.server.journey.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.inbuddy.server.itemlist.entity.Item;
import com.inbuddy.server.takelist.entity.Tasklist;
import com.inbuddy.server.users.entity.Users;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;
import java.util.List;

@Getter
@AllArgsConstructor // 생성자 추가
@NoArgsConstructor
@Entity
@Table(name= "journey_collection")
public class Journey {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "journey_id")
    private int journeyId;

    // 유저와 여정은 1:N관계
    @JsonManagedReference
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id",nullable = false)
    private Users user;

    @Column(name = "journey_name", nullable = false, length = 255)
    private String journeyName;

    @Column(name = "journey_done", nullable = false)
    private boolean journeyDone;

    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    @Column(name = "journey_creation_date", nullable = false)
    private Date journeyCreationDate;

    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    @Column(name = "journey_modification_date", nullable = false)
    private Date journeyModificationDate;


    @JsonBackReference
    @OneToMany(mappedBy = "journey")
    private List<Tasklist> taskLists;

    @JsonBackReference
    @OneToMany(mappedBy = "journey")
    private List<Item> item;

    @Builder
    private Journey(Users user, String journeyName,  Date journeyCreationDate, Date journeyModificationDate) {
        this.user = user;
        this.journeyName = journeyName;
        this.journeyDone = false;
        this.journeyCreationDate = journeyCreationDate;
        this.journeyModificationDate = journeyModificationDate;
    }
    public static Journey createJourney(Users user, String journeyName,Date journeyCreationDate, Date journeyModificationDate){
        return new Journey(user,journeyName,journeyCreationDate,journeyModificationDate);
    }

    public void updateJourney(Users user, String journeyName, String flightCode, boolean journeyDone, Date journeyCreationDate, Date journeyModificationDate){
        this.user = user;
        this.journeyName = journeyName;
        this.journeyDone = journeyDone;
        this.journeyCreationDate = journeyCreationDate;
        this.journeyModificationDate = journeyModificationDate;
    }
}
