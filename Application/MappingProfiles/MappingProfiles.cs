﻿using Application.Models.Article;
using Application.Models.Comments;
using Application.Models.Pagination;
using Application.Models.Profile;
using Application.Models.Tag;
using Application.Models.User;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;

namespace Application.MappingProfiles;

/// <summary>
/// Class with mapping profiles for application
/// </summary>
public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<CreateUserDto, User>();

        CreateMap<User, UserDto>()
            .ForMember(d => d.IsAuthor, o =>
                o.MapFrom(s => s.UserType == UserTypes.Author || s.UserType == UserTypes.Admin))
            .ForMember(d => d.IsAdmin, o => 
                o.MapFrom(s => s.UserType == UserTypes.Admin))
            .ForMember(d => d.ProfilePicture, o 
                => o.MapFrom(s => s.ProfilePicture.Uri));

        CreateMap<CreateArticleDto, Article>();

        CreateMap<User, AuthorDto>()
            .ForMember(d => d.ProfilePicture, o 
                => o.MapFrom(s => s.ProfilePicture.Uri));

        CreateMap<Article, ArticleDto>()
            .ForMember(d => d.Image, o 
            => o.MapFrom(s => s.ArticleImage.Uri));

        CreateMap<CreateCommentDto, Comment>();

        CreateMap<Comment, CommentDto>()
            .ForMember(d => d.AuthorUsername, o => 
                o.MapFrom(s => s.Author.UserName))
            .ForMember(d => d.ArticleId, o => 
                o.MapFrom(x => x.Article.Id))
            .ForMember(d => d.AuthorProfilePicture, o 
                => o.MapFrom(s => s.Author.ProfilePicture.Uri));

        CreateMap<User, UserProfileDto>()
            .ForMember(d => d.ProfilePicture, o 
            => o.MapFrom(s => s.ProfilePicture.Uri));

        CreateMap<CreateTagDto, Tag>();

        CreateMap<Tag, TagDto>();
    }
}