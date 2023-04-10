using Application.Models.Article;
using Application.Models.Comments;
using Application.Models.Pagination;
using Application.Models.User;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;

namespace Application.MappingProfiles;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<CreateUserDto, User>();

        CreateMap<User, UserDto>()
            .ForMember(d => d.IsAuthor, o =>
                o.MapFrom(s => s.UserType == UserTypes.Author || s.UserType == UserTypes.Admin))
            .ForMember(d => d.IsAdmin, o => 
                o.MapFrom(s => s.UserType == UserTypes.Admin));

        CreateMap<CreateArticleDto, Article>();

        CreateMap<User, AuthorDto>();

        CreateMap<Article, ArticleDto>();

        CreateMap<CreateCommentDto, Comment>();

        CreateMap<Comment, CommentDto>()
            .ForMember(d => d.AuthorUsername, o => 
                o.MapFrom(s => s.Author.UserName))
            .ForMember(d => d.ArticleId, o => 
                o.MapFrom(x => x.Article.Id));
    }
}