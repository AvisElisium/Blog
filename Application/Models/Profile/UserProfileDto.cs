﻿using Application.Models.Article;
using Application.Models.Comments;
using Domain.Enums;

namespace Application.Models.Profile;

public class UserProfileDto
{
    public string Username { get; set; }
    public string Joined { get; set; }
    public UserTypes UserType { get; set; }
    public List<CommentDto> LastComments { get; set; } = new List<CommentDto>();
    public List<ArticleDto> LastArticles { get; set; } = new List<ArticleDto>();
}