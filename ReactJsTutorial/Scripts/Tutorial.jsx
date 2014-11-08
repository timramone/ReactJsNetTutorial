var Comment = React.createClass({
	render: function () {
		return (
			<div className="comment">
				<h2 className="commentAuthor">{this.props.author}</h2>
				{this.props.children}
			</div>
		);
	}
});

var CommentForm = React.createClass({
	handleSubmit: function(e) {
		e.preventDefault();
		var author = this.refs.author.getDOMNode().value.trim();
		var text = this.refs.text.getDOMNode().value.trim();

		if (!text || !author)
			return;

		this.refs.author.getDOMNode().value = '';
		this.refs.text.getDOMNode().value = '';

		$.ajax({
			method: 'post',
			url: this.props.submitUrl,
			data: {author: author, text: text},
			success: function(ok) {
				// nothing for now.
			}
		});
	},
	render: function () {
		return (
			<form className="commentForm" onSubmit={this.handleSubmit}>
				<input placeholder="Name" type="text" ref="author" />
				<input placeholder="Text" type="text" ref="text" />
				<input type="submit" value="push the button" />
			</form>
		);
	}
});

var CommentList = React.createClass({
	render: function () {
		var commentNodes = 
			this.props.data.map(
				function(comment) {
					return (
						<Comment author={comment.author}>{comment.text}</Comment>
					);
				}
			);

		return (
			<div className="commentList">
				{commentNodes}
			</div>
		);
	}
});

var CommentBox = React.createClass({
	getInitialState: function() {
		return {data: []};
	},
	getComments: function() {
		$.ajax({
			url: this.props.url,
			cache: false,
			success: function(comments) {
				this.setState({data: comments});
			}.bind(this)
		});
	},
	componentDidMount: function() {
		this.getComments();
		window.setInterval(this.getComments, this.props.delay);
	},
	render: function() {
		return (
			<div className="commentBox">
				<h1>Comment box</h1>
				<CommentList data={this.state.data} />
				<CommentForm submitUrl={this.props.submitUrl}/>
			</div>
		);
	}
});

React.render(
	<CommentBox url="/comments" submitUrl="/comments/new" delay="1000" />,
	document.getElementById('content')
);