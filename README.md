
# Splay-Tree
Splay Tree implementation in javascript<br/>

# Initialize Splay Tree

//Splay tree init<br/>
var splayTree = new SPLAYTREE();<br/>

# Override Methods

//override the visit of node function <br/>
SPLAYNODE.visit = function(){<br/>
  console.log("info: "+this.info+" left: "+(this.getLeft() != null? this.left.getInfo(): null)
                  +" right: "+(this.getRight() != null? this.right.getInfo(): null)
                  +" parent: "+(this.getParent() != null? this.parent.getInfo(): null));<br/>
};<br/>
//end of overriding when a node is visited<br/>
<br/>
//override the operate of node function<br/>
SPLAYNODE.operate = function(){<br/>
  console.log("been duplicated: "+this.info);<br/>
};<br/>
//end of overriding when there is duplicate node<br/>
<br/>
//override the compare of node function<br/>
SPLAYNODE.compare = function(o){<br/>
  if(this.info > o.getInfo()){<br/>
    return 1;<br/>
  }else if(this.info < o.getInfo()){<br/>
    return -1;<br/>
  }<br/>
  return 0;<br/>
};<br/>
//end of overriding when a node is compared<br/>
<br/>

# To Insert the duplicates
splayTree.insertST(3);<br/>
splayTree.insertST(2);<br/>
splayTree.insertST(3);<br/>
<br/>
# To insert without duplicating
splayTree.insertSTDup(3);<br/>
splayTree.insertSTDup(2);<br/>
splayTree.insertSTDup(3);<br/>
<br/>

# To insert without splaying
splayTree.insertSTDup(3, false);<br/>
splayTree.insertSTDup(2, false);<br/>
splayTree.insertSTDup(8, false);<br/>
<br/>

# To delete an object
//delete a none existing object<br/>
splayTree.delete(7);<br/>
<br/>

# To search
binaryTree.searchST(2); //returns null if not found<br/>
<br/>

# Traverse the Tree
//pre traverse<br/>
console.log("preTraverse");<br/>
splayTree.preTraverse(splayTree.getRoot());<br/>
<br/>
//post traverse<br/>
console.log("PostTraversal");<br/>
splayTree.postTraverse(splayTree.getRoot());<br/>
<br/>
//in traverse<br/>
console.log("inTraversal");<br/>
splayTree.inTraverse(binaryTree.getRoot());<br/>
<br/>
