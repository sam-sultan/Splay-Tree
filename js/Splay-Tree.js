
/**
* Splay Tree Implementation
*/
var SPLAYTREE = function(){

  //root of the tree
  this.root = null;

  //set root
  this.setRoot = function(root){
    this.root = root;
  };

  //get root
  this.getRoot = function(){
    return this.root;
  };

  //set left child
  //@param: parent parent node
  //@param: node node to be inserted
  this.setLeftChild = function(parent = new SPLAYNODE.Node(0), node = new SPLAYNODE.Node(0)){
    if( parent == null
        || parent.getLeft() != null){
      console.log("Runtime Error: setLeftChild");
      return;
    }
    node.setParent(parent);
    parent.setLeft(node);
  };

  //set right child
  //@param: parent parent node
  //@param: node node to be inserted
  this.setRightChild = function(parent = new SPLAYNODE.Node(0), node = new SPLAYNODE.Node(0)){
    if( parent == null
        || parent.getRight() != null){
      console.log("Runtime Error: setChild");
      return;
    }
    node.setParent(parent);
    parent.setRight(node);
  };

  //insert an object into the splay tree
  //if there is a duplicate then call operate on node
  this.insertSTDup = function(i = "", splay = true){

    var p = null;
    var q = null;
    var r = new SPLAYNODE.Node(i);
    //if
    if(this.root == null){
      this.root = r;
    //else
    }else{

      p = this.root;
      q = this.root;
      //begin of while loop
      while(q != null && r.compare(p) != 0){
        p = q;
        if(r.compare(p) < 0){
          q = p.getLeft();
        }else{
          q = p.getRight();
        }

      }
      //end of while loop

      //if
      if(r.compare(p) < 0){
        this.setLeftChild(p, r);
      }else if(r.compare(p) > 0){
        this.setRightChild(p, r);
      }else{
        p.operate();
      }
      //end if

    }
    //end if

    //splay up
    if(splay)
      this.splay(r);

    return r;

  };

  //insert an object into the splay tree
  //even if there is a duplicate it will be added
  this.insertST = function(i = "", splay = true){

    var p = null;
    var q = null;
    var r = new SPLAYNODE.Node(i);
    //if
    if(this.root == null){
      this.root = r;
    //else
    }else{

      p = this.root;
      q = this.root;
      //begin of while loop
      while(q != null){
        p = q;
        if(r.compare(p) < 0){
          q = p.getLeft();
        }else{
          q = p.getRight();
        }

      }
      //end of while loop

      //if
      if(r.compare(p) < 0){
        this.setLeftChild(p, r);
      }else{
        this.setRightChild(p, r);
      }
      //end if

      //splay up
      if(splay)
        this.splay(r);

    }
    //end if

    return r;

  };

  //search ST
  this.searchST = function(i, splay = true){

    var p = null, q = null;

    //var num = 0;

    SPLAYNODE.predefinedNode.setInfo(i);

    if(this.root != null){
      p = this.root;
      while(p != null){
        q = p;
        if(SPLAYNODE.predefinedNode.compare(p) < 0){
          p = p.getLeft();
          //num++;
        }else if(SPLAYNODE.predefinedNode.compare(p) > 0){
          p = p.getRight();
          //num++;
        }else{
          //console.log("Total Comparisons: "+num);//splay
          this.splay(p);
          return p;
        }
      }

    }

    //splay last visited node if not found
    if(q != null && splay)
      this.splay(q);

    //console.log("Total Comparisons: "+num);

    return null;

  };

  //delete a node
  //deletes the first occurrence of i in the tree
  this.delete = function(i){
    var s, t, v;
    var found = false;

    var r = new SPLAYNODE.Node(i);  //node to be found
    var p = this.root;              //is the searched node
    var q = null;                   //is the parent
    //start the loop
    while(p != null && !found){
      if(r.compare(p) == 0){
        found = true;
      }else{
        q = p;
        if(r.compare(p) < 0){
          p = p.getLeft();
        }else{
          p = p.getRight();
        }
      }
    }
    //end of loop

    //if found
    if(found){

      //has one child
      if(p.getLeft() == null){
        v = p.getRight();
      //has one child
      }else if(p.getRight() == null){
        v = p.getLeft();
      //has two children
      }else{
        t = p;            //current node to be deleted
        v = p.getRight(); //get right of the node
        s = v.getLeft();  //get the left of the right child
        //loop
        while(s != null){
          t = v;
          v = s;
          s = v.getLeft();
        }
        //end of loop
        if(t != p){
          t.setLeft(v.getRight());
          if(v.getRight() != null)
            v.getRight().setParent(t);
          v.setRight(p.getRight());
          if(p.getRight() != null)
            p.getRight().setParent(v);
        }
        v.setLeft(p.getLeft());
        if(p.getLeft() != null)
          p.getLeft().setParent(v);
      }
      //end of else

      //save the parent of the inorder successor to
      pv = v != null? v.getParent() : null;

      if(q == null){
        this.root = v;
        if(v != null)
          v.setParent(null);
      }else if(p == q.getLeft()){
        q.setLeft(v);
        if(v != null)
          v.setParent(q);
      }else{
        q.setRight(v);
        if(v != null)
          v.setParent(q);
      }

      //start splaying
      if(p != null){
        //if it has one child or none
        if( p.getParent() !=null
            && ((p.getLeft() == null && p.getRight() == null)
              || (p.getLeft() == null && p.getRight() != null)
              || (p.getLeft() != null && p.getRight() == null)) ){
            this.splay(p.getParent());
        }else if(p.getRight() != null && p.getLeft() != null && pv != null){
            this.splay(pv);
        }
      }
      //end of splaying

    }else if(!found && q != null){
      this.splay(q);
    }

  };

  //pretraverse
  this.preTraverse = function(node){
    if(node != null){
      node.visit();
      this.preTraverse(node.getLeft());
      this.preTraverse(node.getRight());
    }
  };

  //intraverse
  this.inTraverse = function(node){
    if(node != null){
      this.inTraverse(node.getLeft());
      node.visit();
      this.inTraverse(node.getRight());
    }
  };

  //postTraverse
  this.postTraverse = function(node){
    if(node != null){
      this.postTraverse(node.getLeft());
      this.postTraverse(node.getRight());
      node.visit();
    }
  };

  //splay up the node
  this.splay = function(node){

    //while loop
    while(this.root != node){
      //if
      if(node == this.root.getLeft() || node == this.root.getRight()){  //zig rotation
        if(node == this.root.getLeft()){
          node = this.rotateRight(node);
        }else{
          node = this.rotateLeft(node);
        }
      }else{  //if not a zig rotation
        var parent = node.getParent();
        var grandparent = parent.getParent();
        //if a zig zig rotation
        if( ( node == parent.getLeft() && parent == grandparent.getLeft() )
              || ( node == parent.getRight() && parent == grandparent.getRight() ) ){
          if(node == parent.getLeft() && parent == grandparent.getLeft()){
            parent = this.rotateRight(parent);
            node = this.rotateRight(node);
          }else{
            parent = this.rotateLeft(parent);
            node = this.rotateLeft(node);
          }
        //if a zig zag rotation
        }else{
          if(parent.getRight() == node){
            node = this.rotateLeft(node);
            node = this.rotateRight(node);
          }else{
            node = this.rotateRight(node);
            node = this.rotateLeft(node);
          }

        }

      }
      //end of else
    }
    //end of while loop

  };
  //end of splay

  //rotate right
  this.rotateRight = function(node){
    if(node.getParent() == null)
      return;

    var parent = node.getParent();

    if(parent == this.root)
      this.root = node;

    //if node has a right child
    if(node.getRight() != null){
      if(parent.getParent() != null){
        if(parent == parent.getParent().getLeft())
          parent.getParent().setLeft(node);
        else
          parent.getParent().setRight(node);
      }
      parent.setLeft(node.getRight());
      node.getRight().setParent(parent);
      node.setParent(parent.getParent());
      parent.setParent(node);
      node.setRight(parent);
    }else{
      if(parent.getParent() != null){
        if(parent == parent.getParent().getLeft())
          parent.getParent().setLeft(node);
        else
          parent.getParent().setRight(node);
      }
      node.setParent(parent.getParent());
      parent.setParent(node);
      parent.setLeft(null);
      node.setRight(parent);
    }

    return node;

  };
  //end of rotate right

  //rotate left
  this.rotateLeft = function(node){

    if(node.getParent() == null)
      return;

    var parent = node.getParent();

    if(parent == this.root)
      this.root = node;

    //if node has a right child
    if(node.getLeft() != null){
      if(parent.getParent() != null){
        if(parent == parent.getParent().getLeft())
          parent.getParent().setLeft(node);
        else
          parent.getParent().setRight(node);
      }
      parent.setRight(node.getLeft());
      node.getLeft().setParent(parent);
      node.setParent(parent.getParent());
      parent.setParent(node);
      node.setLeft(parent);
    }else{
      if(parent.getParent() != null){
        if(parent == parent.getParent().getLeft())
          parent.getParent().setLeft(node);
        else
          parent.getParent().setRight(node);
      }
      node.setParent(parent.getParent());
      parent.setParent(node);
      parent.setRight(null);
      node.setLeft(parent);
    }

    return node;

  };
  //end of rotate left

};
//end of splay search tree

/**
* Splay tree node
*/
var SPLAYNODE = {};
SPLAYNODE.Node = function(info){

  this.info = info;
  this.parent = null;
  this.left = null;
  this.right= null;

  //set info
  this.setInfo = function(info){
    this.info = info;
  };

  //get info
  this.getInfo = function(){
    return this.info;
  };

  //set left child
  this.setLeft = function(node){
    this.left = node;
  };

  //set right child
  this.setRight = function(node){
    this.right = node;
  };

  //set parent
  this.setParent = function(node){
    this.parent = node;
  };

  //get parent
  this.getParent = function(){
    return this.parent;
  };

  //get right child
  this.getRight = function(){
    return this.right;
  };

  //get left child
  this.getLeft = function(){
    return this.left;
  };

  //visit
  this.visit = SPLAYNODE.visit == null?function(){console.log(this.info);}: SPLAYNODE.visit;

  //operate
  this.operate = SPLAYNODE.operate == null?function(){console.log("skipping adding "+this.info+" since it has been already added.");}:SPLAYNODE.operate;

  //compare
  this.compare = SPLAYNODE.compare == null?
  function(o){
    if(this.info > o.getInfo()){
      return 1;
    }else if(this.info < o.getInfo()){
      return -1;
    }
    return 0;
  }: SPLAYNODE.compare;

  return this;

};

//predefined node so if there is only an info supplied
SPLAYNODE.predefinedNode = new SPLAYNODE.Node(0);
