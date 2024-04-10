package com.NhatNguyen.Youtube_clone.service;


import com.NhatNguyen.Youtube_clone.dto.UploadVideoResponse;
import com.NhatNguyen.Youtube_clone.dto.VideoDto;
import com.NhatNguyen.Youtube_clone.exception.YoutubeCloneException;
import com.NhatNguyen.Youtube_clone.model.Video;
import com.NhatNguyen.Youtube_clone.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class VideoService {
    private final S3Service s3Service;
    private final VideoRepository videoRepository;

    public UploadVideoResponse uploadVideo(MultipartFile multipartFile) {
        String videoUrl = s3Service.uploadFile(multipartFile);
        var video = new Video();
        video.setVideoUrl(videoUrl);

        var savedVideo = videoRepository.save(video);
        return new UploadVideoResponse(savedVideo.getId());
    }

    public VideoDto editVideoMetadata(VideoDto videoMetaDataDto) {
        var video = videoRepository.findById(videoMetaDataDto.getVideoId())
                .orElseThrow(() -> new YoutubeCloneException("Cannot find Video with ID - " + videoMetaDataDto.getVideoId()));

        video.setTitle(videoMetaDataDto.getVideoName());
        video.setDescription(videoMetaDataDto.getDescription());
        video.setVideoUrl(videoMetaDataDto.getUrl());
        // Ignore Channel ID as it should not be possible to change the Channel of a Video
        video.setTags(videoMetaDataDto.getTags());
        video.setVideoStatus(videoMetaDataDto.getVideoStatus());
        // View Count is also ignored as its calculated independently
        videoRepository.save(video);
        return null;
    }
}

