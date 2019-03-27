# deferredGang: Xiaojie(Aaron) Li, Sophia Xia, Ryan Aday, Ranauk Chowdhury

## Data
We will be using college/university data from [Data USA](https://datausa.io/). This site has huge data sets with various statistics regarding universities and colleges such as tuition and fees, acceptance rates, jobs after graduation, and many more. We chose this dataset since it is very relevant to us seniors as we have just gone through the college process. Tools such as Naviance are helpful, but sometimes there is a need for more data and statistics without having to do an in-depth search.

## Visualization
We will have Data USA's own college data pages in mind as an inspiration for our site, though our data will be used on a smaller scale. Users will be able to see two large visualizations of college tuition and acceptance rate data. They will be circle graphs, where higher net cost and lower acceptance will be the largest circles respectively. That way, users can see based on the circles which colleges are best for net cost, and which are the most selective. In addition, we want to have the following features:

* a search for college by name that displays tuition and net cost as a bar graph compared to 10ish similar colleges(or different colleges for a better comparison)
* search for college by name that displays that jobs after graduation for that college as a pie chart to get an idea of what that college is good for
* search by name that shows grades/test scores along with stats for other colleges
* this list is tentative

Users can interact with data by seeing specific information on each college based on the search by hovering over the graphs.

Our aim is to simplify or help students select colleges good for them, or more efficiently do research on quick statistics about colleges. Users will be able to explore questions such as: "is this college the right choice for me considering the jobs after graduation?", or "is this college likely to be affordable for me?"

## d3 Visualization
* d3 will be used to simulate and pull data from multiple spreadsheets together to create graphs based on user queries
  * each college's data is stored as its own spreadsheet and will need to be called in order to access the data
* The d3 visualization will be dependent on the parameters given and queries inputted
  * enter/exit selections will be used to implement this
* As transitions will be handled by Flask queries (at least for now; may change later on), there will be no d3 transitions when it comes to data
* Responsiveness of graphs/data will be contingent upon the graphs used (see below)
* Examples to be used:
  * [Bar chart with tooltips](http://bl.ocks.org/Caged/6476579)
  * [Dual scale bar chart](https://github.com/liufly/Dual-scale-D3-Bar-Chart)
  * Possibly [simple dashboard](http://bl.ocks.org/NPashaP/96447623ef4d342ee09b)
