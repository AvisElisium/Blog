namespace Domain.Entities;

public class ProfilePicture : Image
{
    public User User { get; set; }
    public string UserId { get; set; }
}