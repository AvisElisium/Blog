﻿using Application.Models.Comments;
using FluentValidation;
using HtmlAgilityPack;

namespace Application.Validators;

public class CreateCommentValidator : AbstractValidator<CreateCommentDto>
{
    public CreateCommentValidator()
    {
        RuleFor(x => x.Content)
            // custom validator - empty textEditor sends empty <p> tag
            .Custom(((s, context) =>
            {
                var htmlDoc = new HtmlDocument();
                htmlDoc.LoadHtml($"<div>{s}</div>");
                var innerText = htmlDoc.DocumentNode.SelectSingleNode("//div").InnerText;
                var img = htmlDoc.DocumentNode.SelectNodes("//img");
                
                // check for text and presence of images
                if (innerText?.Length == 0 && img?.Count == 0)
                {
                    context.AddFailure("Comment can't be empty");
                }
                
            }))
            .MinimumLength(6).WithMessage("Comment must be at least 6 characters long");
    }
}