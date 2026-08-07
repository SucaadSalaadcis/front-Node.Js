const AuthTitle = ({title, text}) => {

    return(
        <div className="auth-title">
            <h1 className="title">{title}</h1>
            <p className="text">{text}</p>
        </div>
    )
}

export default AuthTitle;