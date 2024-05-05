<?php

// Send CORS headers for all requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: *");

// Handle OPTIONS request separately
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') 
{
    exit;
}

if($_SERVER['REQUEST_METHOD'] === 'POST')   
{
    $path = $_SERVER['REQUEST_URI'];

    if(strstr($path, '/server.php/Ldata')!='')
    {
        $jsonLFilePath = 'Ldata.json';
        
        if (file_exists($jsonLFilePath))
        {
            $jsonLData = file_get_contents($jsonLFilePath);

            // Decode the JSON data
            $data = json_decode($jsonLData, true);  // Set the second parameter to true for an associative array
        
            // Check if decoding was successful
            if ($data === null)
            {
                echo 'Error parsing JSON';
            } 
            else 
            {
                // Add the data from the JSON file to the response
                $response['data'] = $data;
    
                // Set the response headers
                header('Content-Type: application/json');
    
                // Send the JSON-encoded response
                echo json_encode($response);
            }
        }           
        else
        {
            header('HTTP/1.1 204 No Content');
            echo 'JSON file not found';
        }
    }
    else if(strstr($path, '/server.php/Hdata')!='')
    {
        $jsonHFilePath = 'Hdata.json';
        
        if(file_exists($jsonHFilePath))
        {
            $jsonHData = file_get_contents($jsonHFilePath);

            // Decode the JSON data
            $data = json_decode($jsonHData, true);  // Set the second parameter to true for an associative array
        
            // Check if decoding was successful
            if ($data === null)
            {
                echo 'Error parsing JSON';
            } 
            else 
            {
                // Add the data from the JSON file to the response
                $response['data'] = $data;
    
                // Set the response headers
                header('Content-Type: application/json');
    
                // Send the JSON-encoded response
                echo json_encode($response);
            }
        }
        else
        {
            header('HTTP/1.1 204 No Content');
            echo 'JSON file not found';
        }
    }
    else if(strstr($path, '/server.php/Sdata')!='')
    {
        $jsonSFilePath = 'Signdata.json';
        
        if(file_exists($jsonSFilePath))
        {
            $jsonSData = file_get_contents($jsonSFilePath);

            // Decode the JSON data
            $data = json_decode($jsonSData, true);  // Set the second parameter to true for an associative array
        
            // Check if decoding was successful
            if ($data === null)
            {
                echo 'Error parsing JSON';
            } 
            else 
            {
                // Add the data from the JSON file to the response
                $response['data'] = $data;
    
                // Set the response headers
                header('Content-Type: application/json');
    
                // Send the JSON-encoded response
                echo json_encode($response);
            }
        }
        else
        {
            header('HTTP/1.1 204 No Content');
            echo 'JSON file not found';
        }
    }
    else if(strstr($path, '/server.php/Signdata')!='')
    {            
        $sign_data = file_get_contents('php://input');

        if(!empty($sign_data))
        {
            $data = json_decode($sign_data,true);

            if(is_array($data))
            {
                $file_Spath = 'Signdata.json';

                if(!file_exists($file_Spath))
                {
                    fopen($file_Spath, 'w');
                }

                $signin_data = file_get_contents($file_Spath); // Get existing data from the file
                $signin_data_array = json_decode($signin_data, true) ?? []; // Decode existing data as an array or create an empty array
                $signin_data_array[] = $data; // Add new data to the array
                $updated_SData = json_encode($signin_data_array, JSON_PRETTY_PRINT); // Encode the updated data as JSON              
                // Write the updated data to the file
                file_put_contents($file_Spath, $updated_SData);

                  // Prepare the response
                  $response = 
                  [
                   'status' => 'success',
                   'message' => 'Data received successfully.'
                   ];

               // Send the response as JSON
               header('Content-Type: application/json');
               echo json_encode($response);
            }
        }  
    }
        
    else if(strstr($path, '/server.php/rawdata')!='')
    {
        
        $weather_data = file_get_contents('php://input');

        if(!empty($weather_data))
        {
            $data = json_decode($weather_data, true);

            if(is_array($data))
            {
                $data['timestamp'] = time(); 

                $file_Lpath= 'Ldata.json';
    
                if(!file_exists($file_Lpath))
                {
                    fopen($file_Lpath, 'w');
                }

                $weather_data_array[] = $data;
                $updated_LData = json_encode($weather_data_array);

                //  // Write the updated data to the file
                 file_put_contents($file_Lpath, $updated_LData); 
    
                $file_Hpath = 'Hdata.json';
                
                if(!file_exists($file_Hpath))
                {
                    fopen($file_Hpath, 'w');
                }

                $current_data = file_get_contents($file_Hpath); // Get existing data from the file
                $weather_data_array = json_decode($current_data, true) ?? []; // Decode existing data as an array or create an empty array
                $weather_data_array[] = $data; // Add new data to the array
                $updated_HData = json_encode($weather_data_array, JSON_PRETTY_PRINT); // Encode the updated data as JSON              
                 // Write the updated data to the file
                 file_put_contents($file_Hpath, $updated_HData);


                   // Prepare the response
                   $response = 
                   [
                    'status' => 'success',
                    'message' => 'Data received successfully.'
                    ];

                // Send the response as JSON
                header('Content-Type: application/json');
                echo json_encode($response);

            }
        }
    }
    else
    {
        header('HTTP/1.1 404 Not Found');
        echo 'Not Found';
    }
}

else
{
    header('HTTP/1.1 405 Method Not Allowed');
    echo 'Method not allowed';
}

?>