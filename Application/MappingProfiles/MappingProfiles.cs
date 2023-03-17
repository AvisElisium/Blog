using Application.Models.Article;
using Application.Models.Pagination;
using Application.Models.User;
using AutoMapper;
using Domain.Entities;

namespace Application.MappingProfiles;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<CreateUserDto, User>();

        CreateMap<User, UserDto>();

        CreateMap<CreateArticleDto, Article>();

        CreateMap<User, AuthorDto>();

        CreateMap<Article, ArticleDto>();
    }
}