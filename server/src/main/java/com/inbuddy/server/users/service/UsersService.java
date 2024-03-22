package com.inbuddy.server.users.service;

import com.inbuddy.server.global.exception.UserNotFoundException;
import com.inbuddy.server.users.entity.Users;
import com.inbuddy.server.users.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UsersService {
    private final UsersRepository usersRepository;

    public Users findByUserId(int userId){
        return usersRepository.findByUserId(userId);
    }


}
