var Place = function() {
  this.content = "empty";
};

Place.prototype.setContent = function(color)
{
  this.content = color;
}

Place.prototype.getContent = function()
{
  return this.content;
}

Place.prototype.isEmpty = function()
{
  return this.content == "empty";
}