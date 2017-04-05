var projectsList = [
	{
		name: "Финансовый отдел",
		vacancies: [
			{
				name: "Бухгалтер",
				status: true
			},
			{
				name: "Аудитор",
				status: true
			},
			{
				name: "Финансовый директор",
				status: false
			}
		]
	},
	{
		name: "Кадры",
		vacancies: [
			{
				name: "Менеджер по найму персонала",
				status: false
			}
		]
	},
	{
		name: "Call-центр",
		vacancies: [
			{
				name: "Руководитель группы",
				status: true
			},
			{
				name: "Оператор call-центра Москва",
				status: false
			},
			{
				name: "Оператор call-центра Барнаул",
				status: true
			},
			{
				name: "Руководитель отдела",
				status: false
			},
			{
				name: "Технический специалист",
				status: true
			},
			{
				name: "Менеджер по продаже оборудования",
				status: true
			}
		]
	}
];

var vacancyOpen = "Вакансия открыта, идёт набор кандидатов";
var vacancyClosed = "Вакансия закрыта, сотрудник нанят";

var DeleteVacancy = React.createClass({
	getInitialState: function(){
		var vacancies = this.props.vacancies;
		return {vacanciesList: vacancies};
	},
	handleClick: function(e){
		e.preventDefault();

		var vacancies = this.props.vacancies;
		var index = this.props.index;
		
		this.setState({
			vacanciesList: vacancies.splice(index, 1)
		});
		render();
	},
	render: function(){
		return(
			<a href="#" onClick={this.handleClick}>Удалить</a>
		);
	}
});

var CloseVacancy = React.createClass({
	getInitialState: function(e){
		var vacancies = this.props.vacancies;
		// console.log(this.props.vacancies[this.props.index].status);
		return {status: this.props.vacancies[this.props.index].status};
	},
	changeStatus: function(e){
		e.preventDefault();
		var state = this.state.status;
		
		state = !state;

		this.props.addStatus(state, this.props.index);
		this.setState({
			status: state
		});
		// console.log(this.state.status);
		
		// console.log(this.props.vacancies);

		
	},
	render: function(){
		if(this.state.status){
			return(
			<a href="#" onClick={this.changeStatus}>Закрыть вакансию</a>
			);	
		} else {
			return(
			<a href="#" onClick={this.changeStatus}>Открыть вакансию</a>
		);
		}
		
	}
});

var VacanciesList = React.createClass({
	getInitialState: function(){
		return {status: this.props.vacancies};
	},
	addStatus: function(status, index){
		// console.log(status);
		// console.log("this.state.status", this.state.status);
		// console.log("this.state.status index", this.state.status[index].status);
		this.state.status[index].status = status;
		this.setState({
			status: this.state.status
		});
	},
	render: function(){
		// console.log(this.props.vacancies);
		var vacancy = this.props.vacancies;
		var that = this;
		
		if(vacancy.length > 0){
			var vacancy_list = vacancy.map(function(item, index){
			var itemStatus;

			// console.log(that.state.status);
			
			if(that.state.status[index].status){
				itemStatus = vacancyOpen;
			} else {
				itemStatus = vacancyClosed;
			}			
			return (
				<div key={index} className="vacancy">
					<h3>{item.name}</h3>
					<div>
						<p>{itemStatus}</p>
						<CloseVacancy addStatus={that.addStatus} vacancies={vacancy} index={index}/>
						<DeleteVacancy vacancies={vacancy} index={index}/>
					</div>
				</div>
				);
			});
		} else {
			return null;
		}
		return (
			<div>
				{vacancy_list}
			</div>
		);
	}
});

var VacancyAdd = React.createClass({
	getInitialState: function(){
		var vacancies = this.props.vacancies;
		return {vacanciesList: vacancies, input: ''};
	},
	onAddVacancy: function(e){
		console.log(this.props.vacancies);
		if(this.props.vacancies.length > 0){
			var vacancy = this.props.vacancies.push({name: this.state.input});	
		} else {
			this.props.vacancies = [{name: this.state.input, status: false}];
			var vacancy = this.props.vacancies;
		}
		
		this.setState({
			vacanciesList: vacancy
		});
		render();
	},
	handleClick: function(){
		this.onAddVacancy();
		this.props.onCloseModal();
	},
	handleChange: function(e){
		console.log(e.target.value);
		this.setState({ input: e.target.value });
	},
	render: function(){
		return(
			<div>
				<input type="text" placeholder="Название вакансии" onChange={this.handleChange}/>
				<button onClick={this.handleClick}>Создать</button>
			</div>
		);
	}
});

var ProjectList = React.createClass({
	getInitialState: function(){
		return { active: []};
	},
	handleClick: function(index, e){
		e.preventDefault();
		var active = this.state.active.slice();
		active[index] = !active[index];
		this.setState({active});
	},
	renderItem: function(item, index){
		return (
			<div key={index} className="project">
				<h2><a href="#" onClick={this.handleClick.bind(this, index)}>{item.name}</a></h2>
				<div>{item.vacancies.length} вакансии
					<AddButton index={index} vacancies={item.vacancies}/>
				</div>
				<div>
					<CloseProject/>
					<DeleteProject project={item} index={index}/>
				</div>
				<div className={this.state.active[index] ? "show" : "hidden"}>
					<VacanciesList vacancies={item.vacancies}/>
				</div>
			</div>
		)
	},
	render: function(){
		var project = this.props.project;

		var project_list = project.map(this.renderItem);
		return (
			<div className="project-list">
			{project_list}
			</div>
		);
	}
});

var VacancyFilter = React.createClass({
	render: function(){
		return (
			<div className="vacancy-filter">
				<input 
					type="text"
					className="vacancy_filter" 
					placeholder="Search"/>
			</div>
		);
	}
});

var ProjectNew = React.createClass({
	render: function(){
		return (
			<div className="project" onClick={this.handleClick.bind(this, index)}>
				<h2>{item.name}</h2>
				<p>{item.vacancies.length} вакансии</p>
				<div className={this.state.active[index] ? "show" : "hidden"}>
					<VacanciesList vacancies={item.vacancies}/>
				</div>
			</div>
		);
	}
});

var ProjectAdd = React.createClass({
	getInitialState: function(){
		return {projectList: projectsList, input: ''};
	},
	onAddProject: function(e){
		// var projectName = this.state.projectList;
		var project = projectsList.push({name: this.state.input, vacancies: 0});
		this.setState({
			projectList: project
		});
		console.log(this.state.input);
		console.log(projectsList);
		render();
	},
	handleClick: function(){
		this.onAddProject();
		this.props.onCloseModal();
	},
	handleChange: function(e){
		console.log(e.target.value);
		this.setState({input: e.target.value});
	},
	render: function(){
		return(
			<div>
				<input type="text" placeholder="Название" onChange={this.handleChange}/>
				<button onClick={this.handleClick}>Создать</button>
			</div>
		);
	}
});

var DeleteProject = React.createClass({
	getInitialState: function(){
		return {projectList: projectsList};
	},
	handleClick: function(e){
		e.preventDefault();

		var index = this.props.index;
		
		this.setState({
			projectList: projectsList.splice(index, 1)
		});
		render();
	},
	render: function(){
		return(
			<a href="#" onClick={this.handleClick}>Удалить</a>
		);
	}
});

var CloseProject = React.createClass({
	handleClick: function(e){
		e.preventDefault();
		console.log("hello2");
	},
	render: function(){
		return(
			<a href="#" onClick={this.handleClick}>закрыть проект</a>
		);
	}
});

var AddButton = React.createClass({
	getInitialState: function(){
		return {isModalOpen: false};
	},
	toggleModal: function(){
		this.setState({isModalOpen: !this.state.isModalOpen})
	},
	render: function(){
		// console.log("index is", this.props.index);
		// console.log("vacancies", this.props.vacancies);
		return (
			<div className="project-new" onClick={this.handleClick}>
				<button onClick={this.toggleModal}>Добавить {this.props.name}</button>
				<Modal show={this.state.isModalOpen}
					onClose={this.toggleModal} name={this.props.name} title={this.props.title} vacancies={this.props.vacancies}/>
			</div>
		);
	}
});

var Modal = React.createClass({
	render: function(){
		console.log(this.props.show);
		if(!this.props.show){
			return null;
		}
		console.log(this.props.title);
		if(this.props.title == "Проект"){
			return (
			<div className="background-overlay">
				<div className="modal">
					Новый проект
					<a href="#" onClick={this.props.onClose}>закрыть</a>
					<hr/>
					<ProjectAdd onCloseModal={this.props.onClose}/>
				</div>
			</div>
			);	
		} else {
			// console.log("vacancies", this.props.vacancies);
			return (
			<div className="background-overlay">
				<div className="modal">
					Новая вакансия
					<a href="#" onClick={this.props.onClose}>закрыть</a>
					<hr/>
					<VacancyAdd onCloseModal={this.props.onClose} vacancies={this.props.vacancies}/>
				</div>
			</div>
		);
		}
		
	}
});

var App = React.createClass({
	render: function(){
		return (
			<div>
				<VacancyFilter/>
				<AddButton name="проект" title="Проект"/>
				<ProjectList project={projectsList}/>
			</div>
		);
	}
});

function render(){
	ReactDOM.render(
		<App/>,
		document.getElementById('root')
	);
}
render();