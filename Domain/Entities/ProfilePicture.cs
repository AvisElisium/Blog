namespace Domain.Entities;

public class ProfilePicture : Image
{
    public User User { get; set; }
    public string UserUsername { get; set; }
}