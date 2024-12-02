import { useSession } from "next-auth/react";
import { Children, createContext } from "react";
import { useState } from "react";


const CartContext=createContext(
    {
        items: [], 
        totalAmount: 0, 
        addItem: function (id) {}, 
    removeitem:function(id,productid){}
    }
    
    
    );


        export function CartContextProvider(props)
            {

                const [cartItems, setCartItems] = useState([]);
                const [totalamounts, settotalamount] = useState(0);

                function addItems(id)
                {

                 fetch("/api/getcart",
                    {

method:"POST",
headers: {
    'Content-Type': 'application/json' 
  },
body:JSON.stringify({userid:id})




                    }).then(res=>res.json()).then((data)=>{
                        
                        
                        setCartItems(data)
                    settotalamount(data.length);
                    
                    console.log(data.length);
                    })



                }

                function removeitems(id,productid)
                {
                    fetch("/api/removecart",
                        {
    
    method:"POST",
    headers: {
        'Content-Type': 'application/json' 
      },
    body:JSON.stringify({userid:id,

        productid:productid
    })
    
    
    
    
                        }).then(res=>res.json()).then((data)=>{
                            
                            
                            setCartItems(data)
                        settotalamount(data.length);
                        console.log(data.length);
                        
                        })
    



                }
const context={items:cartItems,totalamount:totalamounts,addItem:addItems,removeitem:removeitems};

return(

<CartContext.Provider value={context}>

{props.children}


</CartContext.Provider>


);


            }

export default CartContext;
