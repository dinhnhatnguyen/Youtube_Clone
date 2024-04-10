package com.NhatNguyen.Youtube_clone.repository;


import com.NhatNguyen.Youtube_clone.model.Video;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface VideoRepository extends MongoRepository<Video, String> {
}
