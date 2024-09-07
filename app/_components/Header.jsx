const Header = () => {
	return (
		<Header className="p-5 flex justify-between items-center border shadow-sm">
			<Image src={'./logo.svg'} width={100} height={100} />
			<Button>Get Started</Button>
		</Header>
	)
}