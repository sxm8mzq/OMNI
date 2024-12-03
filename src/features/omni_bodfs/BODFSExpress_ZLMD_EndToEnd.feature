Feature: Guest User Place Order With Master Card STH
 
  Background: User launches url
                # Given the user launches the url
              Given the user launches the SAP url and login to SAP
 
  @e2e
   Scenario Outline: User should able to place order with valid card 
    Then the user enters text "9765" in textbox with placeholder "Postal Code, City, or Store Number"
    Then the user clicks on the "search" icon at index "2"
   ### Then the user waits for text "SCARBOROUGH #7001" to be visible
    Then the user click on "Select"
    Then the user enters text sku in textbox with placeholder "What can we help you find?"
    Then the user clicks on the "search" icon at index "1"
    Then the user waits for text "Add To Cart" to be visible
    Then the user validates if " Want it Installed? " text is visible
    # Then the user validates if " Local Pros are available near " text is visible
    Then the user add product to cart
    Then the user validates if " Installation Request " text is not visible
    Then the user click on "View Cart"
    Then the user waits for text "My Cart: " to be visible
    Then the user clicks on text "Tomorrow" at index "1"
    Then the user waits until the spinner is no longer visible
    Then the user validates if " Change Date " text is visible
    Then the user validates if "Connect me to Local Pros" checkbox is not selected
    Then the user click on "Connect me to Local Pros"
    Then the user waits until the spinner is no longer visible
    Then the user click on "Checkout Now"
    Then the user waits for text "Secure Checkout" to be visible
    Then the user click on "Checkout as Guest"
    Then the user waits for text " Cart Summary: " to be visible
    Then the user validates if "Installation Request" text is visible
    Then the user validates if " Select Delivery Options: " text is visible
    Then the user enters text "<firstName>" in the textbox "First Name"
    Then the user enters text "<lastName>" in the textbox "Last Name"
    Then the user enters random email in the textbox "Email Address"
    Then the user enters text "<phoneNum>" in the textbox "Phone"
    Then the user enters text "<city>" in the textbox "City"
    Then the user enters value "<province>" in dropdown "Province"
    Then the user enters text "<postalCode>" in the textbox "Postal Code"
    Then the user enters text "<address>" in textbox with placeholder "Start typing your address..."
    Then the user click on "Continue"
    Then the user waits for text "Credit Card" to be visible
    Then the user switches to the frame "__zoid__card_sdk"
    Then the user enters the "Hdcc" card details
    Then the user switches to the parent frame
    Then the user enters billing details for "Hdcc" card
    Then the user click on "Continue"
    Then the user waits for text "Place Order " to be visible
    Then the user clicks on text "Place Order" at index "2"
    Then the user waits for text " Confirmation " to be visible
    Then the user waits for text " Your order was successful. " to be visible
    Then the user validates if " Your order was successful. " text is visible
    Then the user validates if the text " Order Number:" is visible at index "1"
    Then the user validates if " EXPRESS DELIVERY: " text is visible
    Then the user validates if "SCHEDULED DELIVERY:" text is visible
    Then the user validates if " We will call or text you about 30 minutes before your delivery. " text is visible
    Then the user validates if "Requested: Local Pro" text is visible
    
    #   # Integration#
            
          # -------------------- Auth ---------------------
            #   Then the user launches the SAP url and login to SAP
              Then the user check the bodfs zlmd order details with Tcode /nva03
              Then the user do the authorization for SAP

         # # # # # ----------------- Delivery Creation---------
            Then the user check the Outbound Delivery /nva03

       ###### ----------------------picking-----------------
          Then the user enter do the picking for ZLMD and picking request created /nva03
          Then the user go to store order display Document to get value /nva03
          Then the user go to create DPR /nse37
          Then the user checks the DPR /nva03
  #      # # # # -------------------Goods Receipt------------

  # ########------------Release PGI-------------------
           Then the user go to OBD PGI for releasing the delivery /nsa38
           Then the user go to va03 to verify GI status /nva03
               
          
        #  ---------billing block removal------------------
          Then the user removes Billing Block /nsa38
          Then the user verify billing block removed /nva03

          # ----------------F2 Invoice Steps-------------------
          Then the user process F2 Invoice Updated
          Then the user goto sa37 to verify job invoice job status /nsm37
          Then the user verify that the invoice is created /nva03
        ###Then the user verify journal entry is created /nva03
 

    Examples:
      | firstName | lastName    | address       | city        | province | postalCode | phone   | userName | password | sku |
      | Address   | WebdriverIO | 621 Rue Habel | Scarborough | Ontario  | M1R 4E6    | 8944783456 | SXM8MZQ  |xxxx | 1000740986 |
 