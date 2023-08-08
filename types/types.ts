interface IAppResponse<T> {
    data: Array<T>;
    message: string;
    status: string;
}

interface IGorm {
    ID?: number;
    CreatedAt?: string;
    UpdatedAt?: string;
    DeletedAt?: string;
}
interface IUserType extends IGorm {
    Name: string;
    Description?: string;
}

interface IFormError {
    FailedField: string;
    Tag: string;
    Value: string;
    Msg: string,
}

interface IRoom extends IGorm{
    RoomNumber: string;
}

interface IPostalStatus extends IGorm{
    Name?: string;
    Description?: string;
}
interface IUser extends IGorm{
    FirstName: string;
    LastName: string;
    PersonalID: string;
    Email: string;
    UserTypeID: Number;
    UserType: IUserType;
    RoomID: Number;
    Room: IRoom;
    PostalID: Number;
    Postal: IPostal;
    
}
interface IPostal extends IGorm{
    ImageUrl: string;
    PostalStatusID: Number;
    RoomID: Number;
    UserID: Number;
    PostalStatus: IPostalStatus;
    ReceivedDate: String;
    Name: String;

}