

export default function History() {
    return (
        <>
            <div className="relative w-full h-42 md:h-[300px] overflow-hidden rounded">
                <img
                    src='https://images.unsplash.com/photo-1711937579586-32ecfa8fe62b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vdGJhbCUyMHBpdGNofGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=800'
                    alt='Club History'
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full bg-opacity-50 text-white p-4">
                    <h1 className="text-3xl md:text-2xl lg:text-6xl font-bold text-center">CLASSIC FC HISTORY</h1>
                </div>
            </div>

            <div className="max-w-4xl mx-auto mt-12 px-4 font-semibold text-gray-700">
                <p className="mb-6 block">
                    Classic FC was founded in 2010 by a group of passionate locals with a shared vision — to provide young people with an opportunity to nurture and showcase their football talent. The formation of the club was also part of a broader effort to revive and regenerate the legacy of the former Buffallo FC, ensuring that the community’s football culture continued to thrive.
                </p>

                <p className="mb-6 block">
                    Over the years, Classic FC has actively participated in numerous tournaments and local leagues, earning recognition for its commitment, teamwork, and determination on and off the pitch. Despite facing several challenges and setbacks along the way — from limited resources to tough competition — the club has continued to grow stronger, showing resilience and unity in the face of adversity.
                </p>

                <p className="mb-6 block">
                    Today, Classic FC boasts a diverse and passionate fan base drawn from across the community. The supporters have played a vital role in motivating the players and shaping the club’s identity. Beyond football, Classic FC also aims to inspire discipline, teamwork, and personal growth among the youth, reinforcing its place as not just a football club, but a pillar of community development and pride.
                </p>
            </div>
        </>
    )
}
